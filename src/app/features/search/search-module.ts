// src/app/search/search-module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- ¡Muy importante para [(ngModel)]!

import { SearchBar } from './search-bar/search-bar';
import { SearchSection } from './search-section/search-section';
import { SearchPage } from './search-page/search-page';

@NgModule({
  declarations: [
    SearchBar, // Declara los dos componentes
    SearchSection, SearchPage,
  ],
  imports: [
    CommonModule, // Necesario para @for, @if, etc.
    FormsModule, // Necesario para [(ngModel)] en la barra de búsqueda
  ],
  providers: [
    // ¡No pongas 'provideHttpClient' aquí! Ya está en app.module.ts
  ],
  exports: [
    SearchSection, // <-- ¡CLAVE! Exportamos el componente "padre"
  ],
})
export class SearchModule {}
