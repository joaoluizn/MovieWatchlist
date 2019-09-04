import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchOutput = new EventEmitter<any>();

  constructor(
    private movieService: MovieService,
    ) {}

  ngOnInit() {
  }

  searchMovie(searchValue){
    this.searchOutput.emit(this.movieService.searchMovies(searchValue));
  }
}
