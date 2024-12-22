package com.example.dvdrentalsystem.service;

import com.example.dvdrentalsystem.entity.UserInfo;
import com.example.dvdrentalsystem.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserInfo> userDetail = repository.findByName(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public String addUser(UserInfo user) {
        // check if is existed same name
        if(!repository.findByName(user.getName()).isEmpty()){
            return "nameIsExisted";
        }
        else if(!repository.findByEmail(user.getEmail()).isEmpty()){// check if is existed same name
            return "emailIsExisted";
        }
        else{
            user.setPassword(encoder.encode(user.getPassword()));
            repository.save(user);
        }
        return "User Added Successfully.";
    }
    public List<UserInfo> getAllUsers() {
            List<UserInfo> users = new ArrayList<UserInfo>();
            repository.findAll().forEach(users::add); // get all categories
            return users;
    }
}

