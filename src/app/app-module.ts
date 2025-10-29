// src/app/app.module.ts (¡Versión Modular Limpia!)

import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgModule, provideZonelessChangeDetection } from '@angular/core'; // <-- 1. Import here
// --- MÓDULOS PRINCIPALES ---
import { AppRoutingModule } from './app-routing-module';
import { SearchModule } from './features/search/search-module'; // Tu módulo de búsqueda

// --- COMPONENTE RAÍZ ---
import { App } from './app';

// --- COMPONENTES NO STANDALONE (Declarados aquí) ---
import { Playlist } from './features/playlist/playlist';
// (Player ya es standalone)
// (AudioController ya es standalone)
// (SongInfo ya es standalone)

// --- COMPONENTES STANDALONE (Importados aquí para que los declarados los usen) ---
import { SongInfo } from './shared/components/song-info/song-info';
import { AudioController } from './shared/components/audio-controller/audio-controller';

// --- INTERCEPTORES ---
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { addAuthHeaderInterceptor } from './core/interceptors/core/add-auth-header-interceptor';

// --- ¡YA NO HAY PUERTOS NI ADAPTADORES! ---

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, SearchModule, SongInfo, AudioController],
  providers: [
   provideZonelessChangeDetection(),
    CookieService,
    provideHttpClient(withInterceptors([authInterceptor, addAuthHeaderInterceptor])),
    // --- ¡YA NO HAY PROVIDERS HEXAGONALES! ---
  ],
  bootstrap: [App], // Componente raíz
})
export class AppModule {}
