package com.ronak.backend_service.services;

import com.ronak.backend_service.model.User;
import com.ronak.backend_service.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService
{
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//    @Autowired
//    private UserRepo userRepo;

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public void saveUser(User user)
    {
        String encodePwd = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodePwd);
        userRepo.save(user);
    }

    public Optional<User> findByEmail(String email)
    {
        return userRepo.findByEmail(email);
    }
}
