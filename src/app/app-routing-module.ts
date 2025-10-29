// src/app/app-routing-module.ts (CORREGIDO)

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- ¡Importa desde las NUEVAS rutas! ---
import { Player } from './features/player/player';
import { AudioController } from './shared/components/audio-controller/audio-controller';

const routes: Routes = [
  {
    path: '',
    component: Player, // <-- Ruta actualizada
    title: 'Player Music',
  },
  {
    path: 'controller',
    component: AudioController, // <-- Ruta actualizada
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
