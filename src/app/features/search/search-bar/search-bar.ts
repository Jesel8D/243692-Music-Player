// src/app/features/search/search-bar/search-bar.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- 1. Importa FormsModule
import { CommonModule } from '@angular/common'; // <-- 2. Importa CommonModule

@Component({
  selector: 'app-search-bar',
  standalone: true, // <-- 3. ¡Hazlo Standalone!
  imports: [CommonModule, FormsModule], // <-- 4. Importa lo que usa (ngModel)
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBar {
  public searchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  constructor(private router: Router) {}

  doSearch(): void {
    if (!this.searchQuery || this.searchQuery.trim() === '') return;
    this.search.emit(this.searchQuery);
  }

  onFocus(): void {
    this.router.navigate(['/search']);
  }
}
