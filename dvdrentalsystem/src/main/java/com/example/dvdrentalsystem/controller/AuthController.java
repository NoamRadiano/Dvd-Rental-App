package com.example.dvdrentalsystem.controller;

import com.example.dvdrentalsystem.entity.AuthRequest;
import com.example.dvdrentalsystem.entity.Category;
import com.example.dvdrentalsystem.entity.UserInfo;
import com.example.dvdrentalsystem.repository.UserInfoRepository;
import com.example.dvdrentalsystem.service.JwtService;
import com.example.dvdrentalsystem.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserInfoService service;
    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @PostMapping("/auth/register")
    public String addNewUser(@RequestBody UserInfo user) {
        return service.addUser(user);
    }

    @GetMapping("/user/userProfile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() {
        return "Welcome to User Profile";
    }

    @GetMapping("/admin/adminProfile")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }
    @PostMapping("auth/login")
    public String login(@RequestBody AuthRequest authRequest) {

        Optional<UserInfo> _user = repository.findByName(authRequest.getUsername());
        UserInfo user;
        // user is exist
        if(_user.isPresent()){
            user = _user.get();
            authRequest.setRoles(user.getRoles());
        }
        else{
            throw new UsernameNotFoundException("invalid user request !");
        }
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            String token =  jwtService.generateToken(authRequest.getUsername());
            return "{\"token\": "
                    +   "\"" + token +"\", "
                    + user.toString()
                    + "}";
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @PostMapping("auth/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}

