import {Component, input} from '@angular/core';
import {Track} from '../../../interfaces/track';
import {Image} from '../../../interfaces/image';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-song-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-info.html',
  styleUrls: ['./song-info.css'],

  // Estas expresiones agregan dinámicamente las clases al host
  // según el valor del input displayMode.
  host: {
    '[class.main]': 'displayMode() === "main"',
    '[class.card]': 'displayMode() === "card"',
  },
})
export class SongInfo {
  // Signals de entrada
  song = input<Track | undefined>();
  cover = input<Image | undefined>();

  // main: carátula grande del reproductor
  // card: ítem en la playlist
  displayMode = input<'main' | 'card'>('card');
}
