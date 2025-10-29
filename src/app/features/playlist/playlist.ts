// src/app/features/playlist/playlist.ts

import { Component, input } from '@angular/core';
import { Track } from '../../interfaces/track';
import { Image } from '../../interfaces/image';

// --- ✨ IMPORTA LO NECESARIO ✨ ---
import { CommonModule } from '@angular/common'; // Para @for
import { SongInfo } from '../../shared/components/song-info/song-info'; // Para <app-song-info>

@Component({
  selector: 'app-playlist',
  standalone: true, // <-- ✨ HAZLO STANDALONE ✨
  imports: [
    CommonModule, // Necesario para @for
    SongInfo, // Necesario para <app-song-info>
  ],
  templateUrl: './playlist.html',
  styleUrls: ['./playlist.css'],
})
export class Playlist {
  playlist = input<Track[] | undefined>();
  cover = input<Image | undefined>();
}
