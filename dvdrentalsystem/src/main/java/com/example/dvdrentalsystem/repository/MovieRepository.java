package com.example.dvdrentalsystem.repository;

import com.example.dvdrentalsystem.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Transactional
    List<Movie> findAllByIsDeleted(boolean isDeleted);
    @Transactional
    List<Movie> findAllByAgeAndIsDeleted(boolean age, boolean isDeleted);
    @Transactional
    Optional<Movie> findByTitle(String name);

}
