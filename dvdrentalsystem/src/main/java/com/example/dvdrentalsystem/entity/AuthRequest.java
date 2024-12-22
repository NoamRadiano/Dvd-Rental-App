package com.example.dvdrentalsystem.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    private String username;
    private String password;
    private String roles;

    public void  setRoles(String roles){
        this.roles = roles;
    }

}

