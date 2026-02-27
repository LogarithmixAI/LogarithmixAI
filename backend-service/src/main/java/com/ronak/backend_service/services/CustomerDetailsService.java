package com.ronak.backend_service.services;

import com.ronak.backend_service.model.User;
import com.ronak.backend_service.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerDetailsService implements UserDetailsService
{
    private final UserService userService;

//    private UserRepo  userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) {

        User user = userService.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of()
        );
    }
}
