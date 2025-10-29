// src/app/app.module.ts (CORREGIDO)

import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

// --- ¡Importa desde las NUEVAS rutas! ---
import { SongInfo } from './shared/components/song-info/song-info';
import { AudioController } from './shared/components/audio-controller/audio-controller';
import { Playlist } from './features/playlist/playlist';
import { Player } from './features/player/player';
import { SearchModule } from './features/search/search-module'; // <-- Nueva ruta

// --- ¡Importa desde las NUEVAS rutas! ---
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { addAuthHeaderInterceptor } from './core/interceptors/core/add-auth-header-interceptor';

@NgModule({
  declarations: [
    App,
    SongInfo, // <-- Declarado desde 'shared/...'
    AudioController, // <-- Declarado desde 'shared/...'
    Playlist, // <-- Declarado desde 'features/...'
    Player, // <-- Declarado desde 'features/...'
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchModule, // <-- Importado desde 'features/...'
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor, addAuthHeaderInterceptor])),
    CookieService,
  ],
  bootstrap: [App],
})
export class AppModule {}
