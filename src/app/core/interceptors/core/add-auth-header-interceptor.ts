import { environment } from '../../../../environments/environment.development';
import { HttpInterceptorFn } from '@angular/common/http';
// ✨ RUTA CORREGIDA (sube 3 niveles a 'app/', luego baja a 'services/')
import { CookiesStorageService } from '../../../services/general/cookies-storage-service';
import { inject } from '@angular/core';

export const addAuthHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const _cookieStorage: CookiesStorageService = inject(CookiesStorageService);

  if (!req.url.includes(environment.API_URL)) return next(req);

  const newReq = req.clone({
    headers: req.headers.append(
      'Authorization',
      `Bearer ${_cookieStorage.getKeyValue('access_token')}`
    ),
  });

  return next(newReq);
};
