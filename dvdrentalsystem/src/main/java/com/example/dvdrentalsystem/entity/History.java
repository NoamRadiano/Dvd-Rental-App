package com.example.dvdrentalsystem.entity;

import jakarta.persistence.*;
import org.apache.catalina.User;

import java.security.PrivateKey;
import java.util.List;

@Entity
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo user;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
    @Column(name = "date_started")
    private String dateStarted;
    @Column(name = "date_returned")
    private String dateReturned;
    // getters and setters
    public History() {
    }

    public History(UserInfo user, Movie movie, String dateStarted, String dateReturned) {
        this.user = user;
        this.movie = movie;
        this.dateStarted = dateStarted;
        this.dateReturned = dateReturned;
    }

    public long getId() {
        return id;
    }

    public UserInfo getUser() {
        return user;
    }
    public void setUser(UserInfo user) {
        this.user = user;
    }

    public Movie getMovie() {
        return movie;
    }
    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public String getDateStarted() {
        return dateStarted;
    }
    public void setDateStarted(String dateStarted) {
        this.dateStarted = dateStarted;
    }

    public String getDateReturned() {
        return dateReturned;
    }
    public void setDateReturned(String dateReturned) {
        this.dateReturned = dateReturned;
    }

    @Override
    public String toString() {
        return "History [id=" + id + ", User=" + user.getId() + ", Movie_ID=" + movie.getId() + "]";
    }
}

