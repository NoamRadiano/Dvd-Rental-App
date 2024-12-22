package com.example.dvdrentalsystem.controller;

import com.example.dvdrentalsystem.entity.Movie;
import com.example.dvdrentalsystem.entity.Review;
import com.example.dvdrentalsystem.repository.MovieRepository;
import com.example.dvdrentalsystem.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MovieRepository movieRepository;


    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        try {
            List<Review> reviews = new ArrayList<Review>();
            reviewRepository.findAll().forEach(reviews::add); // get all categories
            if (reviews.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // return reviews by movie id
    @GetMapping("/reviews/{id}")
    public ResponseEntity<List<Review>> getReviewsByMovieId(@PathVariable("id") long id) {
        try {
            List<Review> reviews = new ArrayList<Review>();
            reviewRepository.findAllByMovieId(id).forEach(reviews::add); // get all categories
            if (reviews.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        try {
            long movieId = review.getMovie().getId();
            float totalRate = review.getRate();
            int count = 0;
            Movie movie = movieRepository.findById(movieId).get();
            // get all ratings of movie
            List<Review> reviews = reviewRepository.findAllByMovieId(movieId);
            count = reviews.size() + 1;
            // calculate ratings
            for (Review item : reviews) {
                totalRate = totalRate + item.getRate();
            }
            // set new  average rating
            movie.setRating(totalRate/count);
            // set new recommend
            movie.setRecommend(review.getMovie().getRecommend());
            // save
            movieRepository.save(movie);
            Review _review = reviewRepository.save(review);
            return new ResponseEntity<>(_review, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}