package com.ronak.backend_service.dto;

public class UserDto
{
    private String username;
    private String fullname;
    private String email;
    private String role;

    public UserDto() {
    }

    public UserDto(String username, String fullname, String email, String role) {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
