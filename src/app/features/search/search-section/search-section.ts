// src/app/search/search-section/search-section.ts

import { Component, signal } from '@angular/core';
// --- ¡Ruta actualizada! ---
import { SpotifySearchService } from '../../../services/spotify-api/spotify-search-service';
import { Track } from '../../../interfaces/track';
@Component({
  selector: 'app-search-section',
  standalone: false,
  templateUrl: './search-section.html',
  styleUrls: ['./search-section.css'], // Necesitarás crear este archivo
})
export class SearchSection {
  // 1. Creamos una "signal" para guardar los resultados.
  //    Es "reactiva": cuando cambia, el HTML se actualiza solo.
  public results = signal<Track[]>([]);

  // 2. Inyectamos el servicio de Spotify
  constructor(private _spotifySearch: SpotifySearchService) {}

  // 3. Esta es la función que se llama desde el HTML
  public onSearch(query: string): void {
    console.log(`SearchSection recibió la búsqueda: "${query}"`);

    // 4. Llamamos al servicio
    this._spotifySearch.doSearch(query).subscribe(
      (response) => {
        // 5. ¡Guardamos los resultados en la signal!
        //    Revisa tu API, probablemente los resultados están en "response.tracks.items"
        console.log('Resultados de la API:', response);
        this.results.set(response.tracks.items || []); // Actualizamos la signal
      },
      (error) => {
        console.error('Error en SearchSection al buscar:', error);
        this.results.set([]); // Limpiamos resultados si hay error
      }
    );
  }
}
