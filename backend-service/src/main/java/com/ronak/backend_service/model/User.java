package com.ronak.backend_service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userdata")
public class User
{
    @Id
    private String id;

    private String username;
    private String fullname;
    private String email;
    private String role;
    private String dob;
    private String gender;
    private String contact;
    private String country;
    private String password;
    private String confirmPassword;

    public User() {
    }

    public User(String id, String username, String fullname, String email, String role, String dob, String gender, String contact, String country, String password, String confirmPassword) {
        this.id = id;
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.role = role;
        this.dob = dob;
        this.gender = gender;
        this.contact = contact;
        this.country = country;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
