// src/app/features/search/search-module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchPageComponent } from './search-page/search-page';
import { SearchBar } from './search-bar/search-bar';
import { SearchSection } from './search-section/search-section';

@NgModule({
  declarations: [
    // SearchBar, <-- ¡QUITA ESTA LÍNEA!
    SearchSection,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchPageComponent,
    SearchBar, // <-- ¡IMPORTA SearchBar aquí! (para que SearchSection lo use)
  ],
  exports: [
    SearchSection,
    SearchPageComponent,
    // Ya no necesitas exportar SearchBar desde aquí
  ],
})
export class SearchModule {}
