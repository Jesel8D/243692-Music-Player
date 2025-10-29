// src/app/features/search/search-page/search-page.ts

import { Component, signal } from '@angular/core';
import { SpotifySearchService } from '../../../services/spotify-api/spotify-search-service';
import { Track } from '../../../interfaces/track';

// --- ✨ IMPORTA LAS PIEZAS STANDALONE DIRECTAMENTE ---
import { CommonModule } from '@angular/common';
import { SearchBar } from '../search-bar/search-bar'; // <-- Importa SearchBar
import { SongInfo } from '../../../shared/components/song-info/song-info'; // <-- Importa SongInfo

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule, // (Para @if, @for)
    SearchBar, // (Para <app-search-bar>)
    SongInfo, // (Para <app-song-info>)
  ],
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.css'],
})
export class SearchPageComponent {
  // ... (El resto de tu lógica de signals y 'onSearch' se mantiene igual) ...
  public tracks = signal<Track[]>([]);
  public artists = signal<any[]>([]);
  public albums = signal<any[]>([]);

  constructor(private _spotifySearch: SpotifySearchService) {}

  public onSearch(query: string): void {
    // ... (Tu función 'onSearch' se mantiene igual) ...
    if (!query || query.trim() === '') {
      this.tracks.set([]);
      this.artists.set([]);
      this.albums.set([]);
      return;
    }
    this._spotifySearch.doSearch(query).subscribe(
      (response: any) => {
        this.tracks.set(response.tracks?.items || []);
        this.artists.set(response.artists?.items || []);
        this.albums.set(response.albums?.items || []);
      },
      (error) => {
        console.error('Error en SearchPage al buscar:', error);
      }
    );
  }
}
