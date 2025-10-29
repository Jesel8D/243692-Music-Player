// src/app/services/spotify-api/spotify-search-service.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SpotifySearchService {
  constructor(private _http: HttpClient) {}

  doSearch(q: string): Observable<any> {
    // Dejamos 'any' para que acepte la nueva respuesta

    const params = new HttpParams()
      .set('q', q)
      // --- ✨ MODIFICADO: Añadimos 'artist' ✨ ---
      .set('type', 'album,track,artist')
      .set('limit', 10)
      .set('offset', 5)
      .set('market', 'ES');

    return this._http.get<any>(`${environment.API_URL}/search`, {
      params: params,
    });
  }
}
