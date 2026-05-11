package com.ronak.backend_service.services;

import com.ronak.backend_service.dto.LoginRequest;
import com.ronak.backend_service.dto.UserDto;
import com.ronak.backend_service.model.User;
import com.ronak.backend_service.repository.UserRepo;
import com.ronak.backend_service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService
{
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    private UserDto mapToDTO(User user) {
        UserDto dto = new UserDto();
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setFullname(user.getFullname());
        dto.setRole(user.getRole());
        return dto;
    }

    /*public String login(LoginRequest loginRequest)  // dto for login
    {
        //find user by email
        Optional<User> optionalUser = userRepo.findByEmail(loginRequest.getEmail());
        if(optionalUser.isEmpty())
        {
            return "Invalid email or mail doesn't exist";
        }

        User user =  optionalUser.get();

        boolean mathced = passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword()
        );

        if(mathced){
            return "Login Successful";
        }

        return "Invalid Email or password";
    }*/

    //new login method which will return jwt token
    public String login(LoginRequest loginRequest)
    {
        User user = userRepo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()))
        {
            throw new RuntimeException("Incorrect password!");
        }

        //if both email and password matches return token
        return jwtUtil.generateToken(user.getEmail());
    }

    //method to return userDto if email is present in db
    public UserDto getCurrentUser(String email)
    {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        //mappint the user object to UserDto
        return mapToDTO(user);
    }

    //method to save updated profile, request coming from putmapping
    public UserDto updateProfile(String email,User request){
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(request.getUsername() !=null)
        {
            user.setUsername(request.getUsername());
        }

        if(request.getFullname() !=null){
            user.setFullname(request.getFullname());
        }

        if(request.getPassword() !=null){
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if(request.getConfirmPassword() !=null){
            user.setConfirmPassword(passwordEncoder.encode(request.getConfirmPassword()));
        }

        User save = userRepo.save(user);
        return mapToDTO(save);
    }
}
