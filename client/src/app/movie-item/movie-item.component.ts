import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit, OnChanges {
  @Input() movie: Movie;

  favorite: boolean = false;
  favoriteIcon: string = 'favorite_border';

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.isFavorite();
  }

  ngOnChanges() { }

  favoriteMovie() {
    this.movieService.favoriteMovie(this.movie.imdbID).subscribe(
      movie => {
        this.movie = movie;
        this.isFavorite();
      },
      err => console.log("Error Favoriting Movie.")
    );
  }

  isFavorite() {
    if (this.movie.Favorite) {
      this.favoriteIcon = 'favorite';
    } else {
      this.favoriteIcon = 'favorite_border';
    }
  }
}
