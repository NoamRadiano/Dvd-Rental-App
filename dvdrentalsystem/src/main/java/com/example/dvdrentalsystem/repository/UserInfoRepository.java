package com.example.dvdrentalsystem.repository;

import com.example.dvdrentalsystem.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
        Optional<UserInfo> findByName(String name);
        Optional<UserInfo> findByEmail(String email);
        List<UserInfo> findAllByRoles(String roles);
        Optional<UserInfo> findByNameAndPassword(String name, String password);
}

