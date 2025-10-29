// src/app/search/search-bar/search-bar.ts

// ¡Importa EventEmitter y Output!
import { Component, EventEmitter, Output } from '@angular/core';
// Ya NO necesitamos el servicio aquí

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBar {
  public searchQuery: string = '';

  // 1. Creamos el "emisor de eventos"
  // Esto le gritará al padre "¡Hey, el usuario buscó esto!"
  @Output() search = new EventEmitter<string>();

  // 2. Ya NO inyectamos el servicio. Este componente no lo necesita.
  constructor() {}

  doSearch(): void {
    console.log('¡Icono clickeado en search-bar!'); // Log para saber que el clic funciona

    // 3. Revisamos que no esté vacío
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      console.log('Campo vacío, no se emite nada.');
      return;
    }

    // 4. ¡Emitimos el evento al padre con el texto!
    console.log(`Emitiendo búsqueda: "${this.searchQuery}"`);
    this.search.emit(this.searchQuery);
  }
}
