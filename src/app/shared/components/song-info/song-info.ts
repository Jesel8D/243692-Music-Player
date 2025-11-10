// src/app/shared/components/song-info/song-info.ts
import { Component, HostBinding, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../../interfaces/track';
import { Image } from '../../../interfaces/image';

@Component({
  selector: 'app-song-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-info.html',
  styleUrls: ['./song-info.css'],
})
export class SongInfo {
  // Inputs (signals)
  song = input<Track | undefined>();
  cover = input<Image | undefined>();
  displayMode = input<'main' | 'card'>('card');

  // Clases en el <host> según el modo (activa las reglas :host(.card) / :host(.main))
  @HostBinding('class.card')  get isCard() { return this.displayMode() === 'card'; }
  @HostBinding('class.main')  get isMain() { return this.displayMode() === 'main'; }

  // Portada priorizando el input `cover`; si no, usa la del track
  primaryCover = computed<Image | undefined>(() => {
    return this.cover() ?? (this.song()?.album?.images?.[0] as Image | undefined);
  });
}
