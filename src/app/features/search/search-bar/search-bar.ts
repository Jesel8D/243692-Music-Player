import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBar {
  public searchQuery: string = '';

  constructor(private router: Router) {
  }

  doSearch(): void {
    const query = this.searchQuery.trim();
    if (!query) return;

    this.router.navigate(['/search'], {
      queryParams: {q: query},
    });
  }

}
