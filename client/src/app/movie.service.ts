import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private searchMovieUrl = 'http://0.0.0.0:8080/api/search-movies?searchQuery={0}';

  constructor(
    private httpClient: HttpClient,
  ) { }

  searchMovies(searchValue){
    let movies: any[] = [];
    let query = this.searchMovieUrl.replace("{0}", searchValue);
    this.httpClient.get(query).subscribe((data: any[])=> {
      data.forEach(element => {
        movies.push(element);
        console.log(element);
      });
    });
    console.log("Search Completed");
    return movies;
  }
}
