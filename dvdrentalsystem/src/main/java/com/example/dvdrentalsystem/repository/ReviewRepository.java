package com.example.dvdrentalsystem.repository;

import com.example.dvdrentalsystem.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Transactional
    List<Review> findAllByMovieId(Long id);
}
