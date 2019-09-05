import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Watchlist';
  parentMovies: any[] = [];
  favorites: any[] = [];

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit() { }

  searchReceiver($event) {
    this.parentMovies = $event;
  }

  reloadTab(event) {
    if (event.tab.textLabel == 'Favorites') {
      this.movieService.getAllFavorites().subscribe(
        res => this.favorites = res,
        err => console.log(err)
      );
    } else {
      this.movieService.moviesTabReload()
        .subscribe(
          res => this.parentMovies = res,
          err => console.log(err.error.message),
        );
    }
  }
}
