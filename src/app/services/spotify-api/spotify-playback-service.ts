import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development'; // Asegúrate de tener la URL correcta

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlaybackService {

  constructor(private _http: HttpClient) { }

  // Método para reproducir una canción usando la API de Spotify
  play(trackId: string): Observable<any> {
    return this._http.put<any>(`${environment.API_URL}/me/player/play`, {
      uris: [`spotify:track:${trackId}`] // Reemplaza esto con el ID de la canción
    });
  }

  // Método para pausar la canción
  pause(): Observable<any> {
    return this._http.put<any>(`${environment.API_URL}/me/player/pause`, {});
  }

  // Método para saltar a la siguiente canción
  skip(): Observable<any> {
    return this._http.post<any>(`${environment.API_URL}/me/player/next`, {});
  }

  // Método para retroceder a la canción anterior
  previous(): Observable<any> {
    return this._http.post<any>(`${environment.API_URL}/me/player/previous`, {});
  }
}
