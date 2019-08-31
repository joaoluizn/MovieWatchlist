package com.zenos.watchlist.controllers;
import java.io.IOException;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class WatchlistController {
    private static final String template = "Hello, %s!";
    private static final String apiUrl = "http://www.omdbapi.com/?t=%s&apikey=%s";
    private static final String search_movie_template = "This is a movie: %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/hello")
    public String greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return String.format(template, name);
    }

    @GetMapping("/search-movie")
    public String searchMovie(@RequestParam(value="name", defaultValue="Tomorrow") String name) {
        String tempKey = "<your-api-key>";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(String.format(apiUrl, name, tempKey), String.class);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = mapper.readTree(response.getBody());
        } catch (IOException e) {
            e.printStackTrace();
        }

        JsonNode movieName = Objects.requireNonNull(root).path("Title");
//        return String.format(template, movieName);
        return String.format(template, root);

    }
}
