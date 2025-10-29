// src/app/shared/components/song-info/song-info.ts

import { Component, input } from '@angular/core';
import { Track } from '../../../interfaces/track';
import { Image } from '../../../interfaces/image';
import { CommonModule } from '@angular/common'; // <-- 1. Importa CommonModule

@Component({
  selector: 'app-song-info',
  standalone: true, // <-- 2. ¡Hazlo Standalone!
  imports: [CommonModule], // <-- 3. Importa CommonModule aquí
  templateUrl: './song-info.html',
  styleUrls: ['./song-info.css'],
})
export class SongInfo {
  song = input<Track | undefined>();
  cover = input<Image | undefined>();
  displayMode = input<'main' | 'card'>('card');
}
