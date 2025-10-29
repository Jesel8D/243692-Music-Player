// src/app/features/playlist/playlist.ts (CORREGIDO)

import { Component, input } from '@angular/core';
// --- ¡Rutas actualizadas! ---
import { Song } from '../../interfaces/song';
import { Track } from '../../interfaces/track';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-playlist',
  standalone: false,
  templateUrl: './playlist.html',
  styleUrl: './playlist.css',
})
export class Playlist {
  playlist = input.required<Track[] | undefined>();
  cover = input.required<Image | undefined>();
}
