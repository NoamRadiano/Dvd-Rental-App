package com.example.dvdrentalsystem.repository;

import com.example.dvdrentalsystem.entity.History;
import com.example.dvdrentalsystem.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
    @Transactional
    List<History> findAllByUserId(int id);
}