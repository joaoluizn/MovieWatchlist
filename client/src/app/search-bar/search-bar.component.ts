import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchOutput = new EventEmitter<any>();

  messageError = '';
  error = false;
  loading = false;

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit() { }

  searchMovie(searchValue) {
    this.loading = true;
    this.movieService.searchMovies(searchValue).subscribe(
      movies => {
        this.searchOutput.emit(movies);
        this.error = false;
        this.loading = false;
      },
      err => {
        this.handleError(err);
        this.loading = false;
        this.movieService.updateLastSuccess(false);
      },
      () => this.movieService.updateLastSuccess(true)
    );
  }

  handleError(error) {
    this.messageError = error.error.message;
    this.error = true;
  }
}
