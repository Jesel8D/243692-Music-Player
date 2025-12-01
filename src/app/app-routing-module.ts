// src/app/app-routing-module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Player } from './features/player/player';
import { AudioController } from './shared/components/audio-controller/audio-controller';

// 1. Importa tu nueva página
import { SearchPageComponent } from './features/search/search-page/search-page';

const routes: Routes = [
  {
    path: '',
    component: Player,
    title: 'Player Music',
  },
  {
    path: 'search', // La URL será /search
    component: SearchPageComponent,
    title: 'Buscar',
  },
  {
    path: 'controller',
    component: AudioController,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
