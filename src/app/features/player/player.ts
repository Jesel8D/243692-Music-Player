// src/app/features/player/player.ts
import {
  Component, OnInit, ViewChild, HostListener,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { SpotifyAlbumService } from '../../services/spotify-api/spotify-album-service';
import { SpotifyPlaybackService } from '../../services/spotify-api/spotify-playback-service';

import { Album } from '../../interfaces/album';
import { Track } from '../../interfaces/track';

import { SearchBar } from '../search/search-bar/search-bar';
import { SearchPageComponent } from '../search/search-page/search-page';
import { SongInfo } from '../../shared/components/song-info/song-info';
import { Playlist } from '../playlist/playlist';
import { AudioController } from '../../shared/components/audio-controller/audio-controller';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    SearchBar,
    SongInfo,
    Playlist,
    AudioController,
    SearchPageComponent,
  ],
  templateUrl: './player.html',
  styleUrls: ['./player.css'],
})
export class Player implements OnInit {
  album$: Observable<Album>;
  currentTrackIndex = 0;
  isPlaying = false;

  // UI
  showSearch = false;

  // Estado barra (modo externo)
  playbackSeconds = 0;
  trackDuration = 0;

  // Fallback preview (modo interno del AudioController)
  currentPreviewUrl: string | null = null;

  @ViewChild(SearchPageComponent) private searchPage?: SearchPageComponent;

  constructor(
    private _spotifyAlbum: SpotifyAlbumService,
    private _spotifyPlayback: SpotifyPlaybackService
  ) {
    this.album$ = this._spotifyAlbum.getAlbum('2X6WyzpxY70eUn3lnewB7d');
  }

  ngOnInit(): void {
    // Si tienes un progress$ del SDK, suscríbete aquí para sincronizar playbackSeconds/trackDuration
    // this._spotifyPlayback.progress$.subscribe(({ positionMs, durationMs }) => {
    //   this.playbackSeconds = (positionMs ?? 0) / 1000;
    //   this.trackDuration = (durationMs ?? 0) / 1000;
    // });
  }

  // --- Navegación interna ---
  openSearch(q?: string) {
    this.showSearch = true;
    if (q) queueMicrotask(() => this.searchPage?.onSearch(q));
  }
  closeSearch() { this.showSearch = false; }

  @HostListener('document:keydown.escape')
  onEsc() { if (this.showSearch) this.closeSearch(); }

  // --- Reproducción ---
  togglePlayPause(album: Album) {
    if (!album?.tracks?.length) return;
    if (this.isPlaying) this.pauseTrack();
    else this.playTrack(album.tracks[this.currentTrackIndex]);
  }

  playTrack(track: Track) {
    // limpia cualquier preview anterior
    this.currentPreviewUrl = null;

    // setea duración estimada para la UI
    this.trackDuration = this.msToSeconds(track?.duration_ms);
    this.playbackSeconds = 0;

    // 1) Intentar reproducción por Spotify (requiere Premium)
    this._spotifyPlayback.play(track.id).pipe(
      catchError((err) => {
        const status = err?.status || err?.error?.status;
        const reason = err?.error?.reason;
        const message = err?.error?.message;

        // Si es Premium required, hacemos fallback a preview_url (si existe)
        if (status === 403 && (reason === 'PREMIUM_REQUIRED' || /Premium/i.test(message))) {
          const preview = (track as any)?.preview_url;
          if (preview) {
            this.currentPreviewUrl = preview;  // 👈 activa modo interno en AudioController
            this.isPlaying = true;             // la UI refleja "reproduciendo"
            // Nota: la duración real la calculará el <audio> interno; no necesitamos setearla aquí.
            return of(null); // consumimos el error
          } else {
            // Sin Premium y sin preview → no podemos reproducir desde la app
            console.warn('No hay preview_url disponible para esta pista.');
            alert('Esta pista no puede reproducirse sin Spotify Premium y no tiene preview disponible.');
            this.isPlaying = false;
            return of(null);
          }
        }

        // Otros errores: los logeamos y no rompemos la app
        console.error('Error al reproducir con Spotify:', err);
        this.isPlaying = false;
        return of(null);
      })
    ).subscribe(() => {
      // Si no hubo error, estamos reproduciendo vía Spotify
      if (!this.currentPreviewUrl) {
        this.isPlaying = true;
      }
    });
  }

  pauseTrack() {
    if (this.currentPreviewUrl) {
      // Modo preview interno: pausa usando el propio <audio> (AudioController se encarga)
      // Aquí sólo reflejamos la UI; si quieres un control directo, emite un @Output para pausar desde el hijo.
      this.isPlaying = false;
      // (Opcional) podrías implementar un Output en AudioController para play/pause si lo necesitas.
      return;
    }

    // Modo Spotify externo
    this._spotifyPlayback.pause().subscribe(
      () => { this.isPlaying = false; },
      (error) => console.error('Error al pausar la canción', error)
    );
  }

  skipTrack(album: Album) {
    if (!album?.tracks?.length) return;
    this.currentTrackIndex = (this.currentTrackIndex + 1) % album.tracks.length;
    const next = album.tracks[this.currentTrackIndex];
    this.playTrack(next);
  }

  previousTrack(album: Album) {
    if (!album?.tracks?.length) return;
    this.currentTrackIndex = (this.currentTrackIndex - 1 + album.tracks.length) % album.tracks.length;
    const prev = album.tracks[this.currentTrackIndex];
    this.playTrack(prev);
  }

  // --- Seek desde la barra ---
  onSeekFromBar(seconds: number) {
    if (this.currentPreviewUrl) {
      // En modo interno, el AudioController ya ajusta currentTime del <audio>;
      // aquí solo reflejamos la UI si quieres.
      this.playbackSeconds = seconds;
      return;
    }

    // En modo Spotify externo (si tienes endpoint de seek):
    // this._spotifyPlayback.seek(seconds * 1000).subscribe();
    this.playbackSeconds = seconds;
  }

  private msToSeconds(ms?: number | null): number {
    return Math.max(0, Math.floor((ms ?? 0) / 1000));
  }
}
