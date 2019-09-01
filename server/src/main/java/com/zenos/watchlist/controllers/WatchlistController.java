package com.zenos.watchlist.controllers;

import java.util.*;

import com.zenos.watchlist.exceptions.ResourceNotFoundException;
import com.zenos.watchlist.models.Movie;
import com.zenos.watchlist.models.MovieList;
import com.zenos.watchlist.models.SimpleMovie;
import com.zenos.watchlist.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class WatchlistController {
    @Autowired
    private MovieRepository movieRepository;

    @Value("${imdb.key}")
    private String apiKey;

    @Value("${imdb.search.movie.url}")
    private String multipleMovieUrl;

    @Value("${imdb.get.movie.id.url}")
    private String byIDMovieUrl;

    @RequestMapping(value = "/search-movies", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public HashMap<String, Object> searchMovies(@RequestParam(value = "searchQuery", defaultValue = "Tomorrow") String searchQuery) {
        RestTemplate restTemplate = new RestTemplate();
        HashMap<String, Object> response = new HashMap<>();

        MovieList simpleMovieList = restTemplate.getForObject(
                String.format(multipleMovieUrl, searchQuery, apiKey), MovieList.class);

        if (Objects.requireNonNull(simpleMovieList).getResponse().equalsIgnoreCase("True")) {
            List<Movie> movies = fetchAndGetMovies(simpleMovieList);
            response.put("Movies", removeDuplicates(movies));
        } else {
            response.put("Error", "No movie found");
        }
        return response;
    }

    @GetMapping(path = "/all-movies")
    public @ResponseBody
    Iterable<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/movie/{id}")
    public Movie getMovieById(@PathVariable(value = "id") String movieId) {
        return movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie", "id", movieId));
    }

    @RequestMapping(value = "/favorite", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public HashMap<String, Object> favoriteMovie(@RequestParam(value = "imdbID") String imdbID) {
        HashMap<String, Object> response = new HashMap<>();

        Optional<Movie> movieChecker = movieRepository.findById(imdbID);
        if (movieChecker.isPresent()) {
            Movie chosenMovie = movieChecker.get();
            chosenMovie.setFavorite(!chosenMovie.getFavorite());
            movieRepository.save(chosenMovie);
            response.put("Movie", chosenMovie);
        } else {
            response.put("Error", "No movie found");
        }
        return response;
    }

    @GetMapping(path = "/all-favorites")
    public @ResponseBody
    List<Movie> getAllFavorites() {
        return movieRepository.findByFavorite(true);
    }

    private List<Movie> fetchAndGetMovies(MovieList simpleMovieList) {
        List<Movie> movies = new ArrayList<>();
        for (SimpleMovie m : simpleMovieList.getMovies()) {
            Optional<Movie> movieChecker = movieRepository.findById(m.getImdbID());
            if (movieChecker.isPresent()) {
                Movie existentMovie = movieChecker.get();
                movies.add(existentMovie);
            } else {
                Movie newMovie = fetchSingleMovieByID(m.getImdbID());
                if (newMovie != null) {
                    movieRepository.save(newMovie);
                    movies.add(newMovie);
                }
            }
        }
        return movies;
    }

    private Movie fetchSingleMovieByID(String imdbID) {
        RestTemplate restTemplate = new RestTemplate();
        Movie movie = restTemplate.getForObject(String.format(byIDMovieUrl, imdbID, apiKey), Movie.class);
        if (movie != null && movie.getResponse().equalsIgnoreCase("True")) {
            return movie;
        }
        return null;
    }

    private List removeDuplicates(List<Movie> movieList){
        Set<Movie> set = new LinkedHashSet<>(movieList);
        movieList.clear();
        movieList.addAll(set);
        return movieList;
    }
}
