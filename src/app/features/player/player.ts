import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyAlbumService } from '../../services/spotify-api/spotify-album-service';
import { SpotifyPlaybackService } from '../../services/spotify-api/spotify-playback-service';
import { Album } from '../../interfaces/album';
import { Track } from '../../interfaces/track';

// --- ✨ IMPORTACIONES CORREGIDAS ✨ ---
import { CommonModule } from '@angular/common';
import { SearchModule } from '../search/search-module'; // <-- Importa el MÓDULO
import { SongInfo } from '../../shared/components/song-info/song-info';
import { Playlist } from '../playlist/playlist';
import { AudioController } from '../../shared/components/audio-controller/audio-controller'; // <-- Ahora es standalone
@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    SearchModule,
    SongInfo,
    Playlist, // <-- ✨ Añade Playlist aquí ✨
    AudioController,
  ],
  templateUrl: './player.html',
  styleUrls: ['./player.css'],
})
export class Player implements OnInit {
  // ... (El resto de tu código se mantiene igual) ...
  album$: Observable<Album>;
  currentTrackIndex: number = 0;
  isPlaying: boolean = false;

  constructor(
    private _spotifyAlbum: SpotifyAlbumService,
    private _spotifyPlayback: SpotifyPlaybackService
  ) {
    this.album$ = this._spotifyAlbum.getAlbum('4X6PQwYWxtGGtKjAfX6wa6');
  }

  ngOnInit(): void {}

  togglePlayPause(album: Album) {
    if (this.isPlaying) {
      this.pauseTrack();
    } else {
      this.playTrack(album.tracks[this.currentTrackIndex]);
    }
  }

  playTrack(track: Track) {
    this._spotifyPlayback.play(track.id).subscribe(
      () => {
        console.log('Reproduciendo:', track.name);
        this.isPlaying = true;
      },
      (error) => {
        console.error('Error al reproducir la canción', error);
      }
    );
  }

  pauseTrack() {
    this._spotifyPlayback.pause().subscribe(
      () => {
        console.log('Pausando la canción');
        this.isPlaying = false;
      },
      (error) => {
        console.error('Error al pausar la canción', error);
      }
    );
  }

  skipTrack(album: Album) {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % album.tracks.length;
    this.playTrack(album.tracks[this.currentTrackIndex]);
  }

  previousTrack(album: Album) {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + album.tracks.length) % album.tracks.length;
    this.playTrack(album.tracks[this.currentTrackIndex]);
  }
}
