import {Injectable} from "@angular/core";

@Injectable(
   {providedIn: 'root'}
)
export class HelperService {
   constructor() {}

   sortByDate(movies: any[]): any[]{
      movies.sort(function(a,b){
         return new Date(b.Released) - new Date(a.Released);
       });
      return movies;
   }
}