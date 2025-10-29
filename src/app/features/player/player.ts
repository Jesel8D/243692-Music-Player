// src/app/features/player/player.ts (CORREGIDO)

import { Component, OnInit } from '@angular/core';
// --- ¡Rutas actualizadas! (suben un nivel más) ---
import { SpotifyAlbumService } from '../../services/spotify-api/spotify-album-service';
import { Album } from '../../interfaces/album';
import { Observable } from 'rxjs';
import { SpotifyPlaybackService } from '../../services/spotify-api/spotify-playback-service';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.html',
  styleUrls: ['./player.css'],
})
export class Player implements OnInit {
  album$: Observable<Album>;
  currentTrackIndex: number = 0;
  isPlaying: boolean = false;

  constructor(
    private _spotifyAlbum: SpotifyAlbumService,
    private _spotifyPlayback: SpotifyPlaybackService
  ) {
    this.album$ = this._spotifyAlbum.getAlbum('2X6WyzpxY70eUn3lnewB7d');
  }

  // ... (El resto de tu lógica de play/pause se mantiene igual) ...
  ngOnInit(): void {}
  togglePlayPause(album: Album) {
    /* ... */
  }
  playTrack(track: any) {
    /* ... */
  }
  pauseTrack() {
    /* ... */
  }
  skipTrack(album: Album) {
    /* ... */
  }
  previousTrack(album: Album) {
    /* ... */
  }
}
