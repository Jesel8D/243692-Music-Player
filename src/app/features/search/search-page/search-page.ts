import {Component, signal} from '@angular/core';
import {SpotifySearchService} from '../../../services/spotify-api/spotify-search-service';
import {Track} from '../../../interfaces/track';
import {CommonModule} from '@angular/common';
import {SearchBar} from '../search-bar/search-bar';
import {SongInfo} from '../../../shared/components/song-info/song-info';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SearchBar, SongInfo],
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.css'],
})
export class SearchPageComponent {
  public tracks = signal<Track[]>([]);
  public artists = signal<any[]>([]);
  public albums = signal<any[]>([]);

  constructor(
    private _spotifySearch: SpotifySearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Escuchamos cambios en los query params
    this.route.queryParams.subscribe((params) => {
      const query = (params['q'] || '').trim();

      if (!query) {
        this.tracks.set([]);
        this.artists.set([]);
        this.albums.set([]);
        return;
      }

      this.onSearch(query);
    });
  }

  public onSearch(query: string): void {
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

  goHome(): void {
    this.router.navigate(['/']);
  }
}
