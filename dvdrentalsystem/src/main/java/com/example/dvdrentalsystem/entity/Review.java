package com.example.dvdrentalsystem.entity;

import jakarta.persistence.*;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo user;
    @ManyToOne
    private Movie movie;
    private float rate;
    private String text;
    // getters and setters
    public Review() {
    }

    public Review(UserInfo user, Movie movie, int rate, String text) {
        this.user = user;
        this.movie = movie;
        this.rate = rate;
        this.text = text;
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

    public float getRate() {
        return rate;
    }
    public void setRate(float rate) {
        this.rate = rate;
    }

    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "Review [id=" + id + ", User=" + user.getId() + ", Movie_ID=" + movie.getId() + " Rate+" + rate + " Text=" + text + "]";
    }
}

