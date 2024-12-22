package com.example.dvdrentalsystem.controller;

import com.example.dvdrentalsystem.entity.Movie;
import com.example.dvdrentalsystem.entity.UserInfo;
import com.example.dvdrentalsystem.repository.MovieRepository;
import com.example.dvdrentalsystem.repository.UserInfoRepository;
import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import java.nio.file.Paths;
import java.nio.file.Files;

@CrossOrigin(origins = "*", maxAge = 3600)

@RestController
@RequestMapping("/api")
public class MovieController {


    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    ServletContext context;

    private UserInfo getUser(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        return userInfoRepository.findByName(username).get();
    }
    // return all movies
    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        try {
            List<Movie> movies = new ArrayList<Movie>();
            UserInfo user = getUser();
            if(user.isAge()) // age 18
                movieRepository.findAllByIsDeleted(false).forEach(movies::add); // get all movies
            else // age under 18
                movieRepository.findAllByAgeAndIsDeleted(false, false).forEach(movies::add); // get all movies
            if (movies.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(movies, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // return a movie by id
    @GetMapping("/movies/{id}")
    public ResponseEntity<Movie> getMovie(@PathVariable("id") long id) {
        Optional<Movie> movieData = movieRepository.findById(id);

        if (movieData.isPresent()) {
            return new ResponseEntity<>(movieData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // create new movie from admin
    @PostMapping(value="/movies")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        try {
            if(!movieRepository.findByTitle(movie.getTitle()).isEmpty())// existed same name*/
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            Movie _movie = movieRepository.save(movie);
            return new ResponseEntity<>(_movie, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/movies/upload")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> uploadMovieImg(@RequestParam("image") MultipartFile file,
                                                @RequestParam long id) {

        try {
            byte[] imageData = file.getBytes();
            Movie movie =  movieRepository.findById(id).get();
            movie.setImgData(imageData);
            movieRepository.save(movie);
            return new ResponseEntity<>("File uploaded successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // update movie by id from admin
    @PutMapping("/movies/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Movie> updateMovie(@PathVariable("id") long id, @RequestBody Movie movie){
        try{

            if(movieRepository.findByTitle(movie.getTitle()).get().getId() != id)// existed same name
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
           Optional<Movie> movieData =  movieRepository.findById(id);
            if(movieData.isPresent()) {
                Movie _movie = movieData.get();
                _movie.setTitle(movie.getTitle());
                _movie.setInformation(movie.getInformation());
                _movie.setDirector(movie.getDirector());
                _movie.setScripts(movie.getScripts());
                _movie.setQuantity(movie.getQuantity());
                _movie.setImgData(movie.getImgData());
                _movie.setRating(movie.getRating());
                _movie.setAge(movie.getAge());
                _movie.setPrice(movie.getPrice());
                _movie.setReleaseDate(movie.getReleaseDate());
                _movie.setDuration(movie.getDuration());
                _movie.setCategory(movie.getCategory());
                return new ResponseEntity<>(movieRepository.save(_movie), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // delete movie by id from admin
    @DeleteMapping(value = "/movies/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<HttpStatus> deleteMovie(@PathVariable("id") long id){
        try{
           Optional<Movie> movie = movieRepository.findById(id);
            if(!movie.isPresent())  return  new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            Movie _movie = movie.get();
            _movie.setIsDeleted(true);
            movieRepository.save(_movie);
            return  new ResponseEntity<>(null, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}