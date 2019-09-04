import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Watchlist';
  parentMovies: any[] = [];

  searchReceiver($event) {
    this.parentMovies = $event;
  }
}
