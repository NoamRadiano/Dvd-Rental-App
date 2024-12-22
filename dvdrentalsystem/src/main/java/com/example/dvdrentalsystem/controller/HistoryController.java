package com.example.dvdrentalsystem.controller;

import com.example.dvdrentalsystem.entity.History;
import com.example.dvdrentalsystem.entity.Movie;
import com.example.dvdrentalsystem.entity.UserInfo;
import com.example.dvdrentalsystem.repository.HistoryRepository;
import com.example.dvdrentalsystem.repository.MovieRepository;
import com.example.dvdrentalsystem.repository.UserInfoRepository;

import com.example.dvdrentalsystem.service.JwtService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class HistoryController {
    @Autowired
    private HistoryRepository historyRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private JwtService jwtService;

    private UserInfo getUser(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        return userInfoRepository.findByName(username).get();
    }
    @GetMapping("/histories")
    public ResponseEntity<List<History>> getAllHistories() {
        UserInfo user = getUser();

        try {
            List<History> histories = new ArrayList<History>();
            if(user.getRoles().equals("ROLE_ADMIN")){
                historyRepository.findAll().forEach(histories::add); // get all histories
            }else{
                historyRepository.findAllByUserId(user.getId()).forEach(histories::add); // get all histories of user
            }

            if (histories.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(histories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/histories/{id}")
    public ResponseEntity<History> getHistoriry(@PathVariable("id") long id) {
        Optional<History> historyData = historyRepository.findById(id);
        if (historyData.isPresent()) {
            return new ResponseEntity<>(historyData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/histories")
    public ResponseEntity<String> createHistories(@RequestBody History history) {
        try {
            history.setUser(getUser());
            int borrowedCount  = history.getUser().getBorrowed();
            int rentedCount  = history.getUser().getRented();
            history.setMovie(movieRepository.findById(history.getMovie().getId()).get());
            int movieQuantity = history.getMovie().getQuantity();
            history.getUser().setBorrowed(borrowedCount + 1);
            history.getUser().setRented(rentedCount + 1);
            history.getMovie().setQuantity(movieQuantity - 1);
            historyRepository.save(history);
            return new ResponseEntity<>("ok", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // update movie by id from user
    @PutMapping("/histories/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> updateHistory(@PathVariable("id") long id, @RequestBody History history){
        try{
            Optional<History> historyData =  historyRepository.findById(id);
            if(historyData.isPresent()) {
                History _historyData = historyData.get();
                if(_historyData.getDateReturned() != null) return new ResponseEntity<>("Returned Movie.",HttpStatus.BAD_REQUEST);
                _historyData.setDateReturned(history.getDateReturned());
                int rentedCount = _historyData.getUser().getRented();
                rentedCount--;
                int quantity = _historyData.getMovie().getQuantity();
                quantity++;
                _historyData.getUser().setRented(rentedCount);
                _historyData.getMovie().setQuantity(quantity);
                historyRepository.save(_historyData);
                return new ResponseEntity<>("ok", HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}