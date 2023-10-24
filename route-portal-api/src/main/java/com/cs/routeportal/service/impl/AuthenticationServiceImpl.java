package com.cs.routeportal.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AuthenticationServiceImpl implements UserDetailsService {

    @Value("${auth.username}")
    private String authUsername;

    @Value("${auth.password}")
    private String authPassword;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = this.findUserByUsername(username);

        UserBuilder builder = null;

        if (user != null) {
            builder = User.withUsername(username);
            builder.password(new BCryptPasswordEncoder().encode(authPassword));
            builder.authorities(new ArrayList<>());
        } else
            throw new UsernameNotFoundException("User not found");

        return builder.build();
    }

    /**
     * Used dummy data, in real world we should load user from db
     */
    private User findUserByUsername(String username) {
        return username.equalsIgnoreCase(authUsername) ? new User(authUsername, authPassword, new ArrayList<>()) : null;
    }
}
