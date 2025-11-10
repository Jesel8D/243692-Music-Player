// src/app/features/search/search-bar/search-bar.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBar {
  public searchQuery: string = '';

  /** Emite el término para búsquedas inline (SearchSection/Player) */
  @Output() search = new EventEmitter<string>();

  /** Controla si, además de emitir, debe navegar a /search?q=... */
  @Input() navigateOnSearch: boolean = true;

  constructor(private router: Router) {}

  doSearch(): void {
    const q = this.searchQuery?.trim();
    if (!q) return;

    // 1) Emite para quien esté escuchando (e.g. SearchSection en Player)
    this.search.emit(q);

    // 2) Opcionalmente navega (p. ej., cuando se usa fuera de SearchPage)
    if (this.navigateOnSearch) {
      this.router.navigate(['/search'], { queryParams: { q } });
    }
  }

  // ❌ Sin navegación en focus
  // onFocus(): void {}
}
