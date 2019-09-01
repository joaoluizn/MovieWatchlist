package com.zenos.watchlist.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class MovieList {
    @JsonProperty("Search")
    private List<SimpleMovie> movies;

    @JsonProperty("Response")
    private String response;

    public MovieList() {
        movies = new ArrayList<>();
    }

    public List<SimpleMovie> getMovies() {
        return movies;
    }

    public String getResponse() {
        return response;
    }
}
