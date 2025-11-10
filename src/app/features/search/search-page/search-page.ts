// src/app/features/search/search-page/search-page.ts

import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifySearchService } from '../../../services/spotify-api/spotify-search-service';
import { CommonModule } from '@angular/common';
import { SearchBar } from '../search-bar/search-bar';
import { SongInfo } from '../../../shared/components/song-info/song-info';
import { Track } from '../../../interfaces/track';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SearchBar, SongInfo],
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.css'],
})
export class SearchPageComponent implements OnInit {
  public tracks = signal<Track[]>([]);
  public artists = signal<any[]>([]);
  public albums  = signal<any[]>([]);

  constructor(
    private _spotifySearch: SpotifySearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const q = (params.get('q') || '').trim();
      if (q) this.onSearch(q);
      else {
        // Si llegas sin q (por bookmark, etc.), limpias:
        this.tracks.set([]);
        this.artists.set([]);
        this.albums.set([]);
      }
    });
  }

  public onSearch(query: string): void {
    const q = (query || '').trim();
    if (!q) {
      this.tracks.set([]);
      this.artists.set([]);
      this.albums.set([]);
      return;
    }
    this._spotifySearch.doSearch(q).subscribe(
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
