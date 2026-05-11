package com.ronak.backend_service.contoller;

import com.ronak.backend_service.dto.LoginRequest;
import com.ronak.backend_service.dto.UserDto;
import com.ronak.backend_service.model.User;
import com.ronak.backend_service.services.AuthService;
import com.ronak.backend_service.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/auth")
public class AuthController
{
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest)
    {
        try {
            String token = authService.login(loginRequest);
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody User user)
    {
        if(!Objects.isNull(user)){
            userService.saveUser(user);
            return  ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    /*@GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam String email){
        try{
            return ResponseEntity.ok(authService.getCurrentUser(email));
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }*/

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication)
    {
        try{
            String email = authentication.getName();
            return ResponseEntity.ok(authService.getCurrentUser(email));
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //putmapping for updating the profile of existing user
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestParam String email, @RequestBody User user){
        try{
            return ResponseEntity.ok(authService.updateProfile(email,user));
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
