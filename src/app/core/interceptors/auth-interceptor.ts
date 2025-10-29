import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { SpotifyLoginService } from '../../services/spotify-api/spotify-login-service';
// ✨ RUTA CORREGIDA (sube 2 niveles a 'app/', luego baja a 'services/')
import { CookiesStorageService } from '../../services/general/cookies-storage-service';
// ✨ RUTA CORREGIDA (sube 1 nivel a 'core/', luego baja a 'guards/')
import { isTokenResponse } from '../guards/spotify-api/is-token-response';
// ✨ RUTA CORREGIDA (sube 3 niveles a 'src/', luego baja a 'environments/')
import { environment } from '../../../environments/environment.development';
import { catchError, switchMap, throwError, tap, Observable } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const _cookieService = inject(CookiesStorageService);

  return next(req).pipe(
    tap((event) => {
      if (!req.url.includes(environment.AUTH_API_URL)) return;
      if (event instanceof HttpResponse && event.status === 200) {
        const body = event.body as any;

        if (isTokenResponse(body)) {
          const expirationMS = 60 * 60 * 1000;
          const expirationDate = new Date(Date.now() + expirationMS);

          _cookieService.setKey('access_token', body.access_token, expirationDate);
        }
      }
    })
  );
};
