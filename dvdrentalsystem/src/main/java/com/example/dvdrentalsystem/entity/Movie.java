package com.example.dvdrentalsystem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.security.PrivateKey;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String information;
    private String director;
    private String scripts;
    private int quantity;
    @Lob
//    @Column(columnDefinition = "text")
    private byte[] imgData;
    private float rating;
    private boolean age;
    private double price;
    private String releaseDate;
    private int duration;
    private int recommend;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    private boolean isDeleted;

    // getters and setters
    public Movie() {
    }
    public Movie(String title, String information, String director, String scripts,  int quantity, byte[] imgData, float rating, boolean age, double price, String releaseDate, int duration, int recommend, Category category) {

        this.title = title;
        this.information = information;
        this.scripts = scripts;
        this.director = director;
        this.quantity = quantity;
        this.imgData = imgData;
        this.rating = rating;
        this.age = age;
        this.price = price;
        this.releaseDate = releaseDate;
        this.duration = duration;
        this.category = category;
        this.recommend = recommend;
        this.isDeleted = false;

    }

    public Movie(String inception, String s, String christopher_nolan, String christopher_nolan1, int i, Object o, double v, boolean b, double v1, String s1, int i1, int i2, int i3, boolean b1) {
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getInformation() {
        return information;
    }
    public void setInformation(String information) {
        this.information = information;
    }

    public String getDirector() {
        return director;
    }
    public void setDirector(String director) {
        this.director = director;
    }

    public String getScripts() {
        return scripts;
    }
    public void setScripts(String Scripts) {
        this.scripts = Scripts;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public byte[] getImgData(){
        return imgData;
    }
    public void setImgData(byte[] imgData){
        this.imgData = imgData;
    }

    public float getRating(){
        return rating;
    }
    public void setRating(float rating){
        this.rating = rating;
    }

    public boolean getAge(){return age; }
    public void setAge(boolean age) {this.age = age; }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public String getReleaseDate() {
        return releaseDate;
    }
    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getDuration() {
        return duration;
    }
    public void setDuration(int duration) {
        this.duration = duration;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }
    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }

    public int getRecommend(){ return recommend;}
    public void setRecommend(int recommend) {this.recommend = recommend;}

    @Override
    public String toString() {
        return "Movie [id=" + id + ", Title=" + title + "]";
    }
}