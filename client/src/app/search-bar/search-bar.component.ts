import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router }                          from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchOutput = new EventEmitter<any>();

  private searchMovieUrl = 'http://0.0.0.0:8080/api/search-movies?searchQuery={0}';

  constructor(
    private httpClient: HttpClient,
    // private router: Router
    ) {}

  ngOnInit() {
  }

  searchMovie(searchValue){
    let query = this.searchMovieUrl.replace("{0}", searchValue);
    let movies: any[] = [];
    this.httpClient.get(query).subscribe((data)=> {
      data['Movies'].forEach(element => {
        console.log("Imprimindo:", element);
        movies.push(element);
      });
      console.log("Finishing pushing data", movies);
      this.searchOutput.emit(movies);
    });
  }
}
