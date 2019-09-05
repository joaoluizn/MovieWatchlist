import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private searchMovieUrl = 'http://0.0.0.0:8080/api/search-movies?searchQuery={0}';
  private getFavoritesUrl = 'http://0.0.0.0:8080/api/all-favorites';
  private favoriteMovieUrl = 'http://0.0.0.0:8080/api/favorite?imdbID={0}';
  private getAllMoviesUrl = 'http://0.0.0.0:8080/api/all-movies'

  lastSearch = '';
  lastSuccess = false;

  constructor(
    private httpClient: HttpClient,
  ) { }

  searchMovies(searchValue: string): Observable<any>{
    if (searchValue !== ''){
      this.lastSearch = searchValue;
    }
    let query: string = this.searchMovieUrl.replace("{0}", searchValue);
    return this.httpClient.get(query);
  }

  moviesTabReload(){
    if(this.lastSearch !== '' && this.lastSuccess){
      return this.searchMovies(this.lastSearch);
    }
    return of([]);
  }

  getAllFavorites(): Observable<any>{
    return this.httpClient.get(this.getFavoritesUrl);
  }

  favoriteMovie(movieId: string): Observable<any>{
    let query = this.favoriteMovieUrl.replace("{0}", movieId);
    return this.httpClient.get(query);
  }

  getAllMovies(): Observable<any>{
    return this.httpClient.get(this.getAllMoviesUrl);
  }

  updateLastSuccess(status){
    this.lastSuccess = status;
  }
}
