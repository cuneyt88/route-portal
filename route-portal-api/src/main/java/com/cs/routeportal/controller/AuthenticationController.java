package com.cs.routeportal.controller;

import com.cs.routeportal.service.impl.AuthenticationServiceImpl;
import com.cs.routeportal.configuration.security.JwtToken;
import com.cs.routeportal.dto.authentication.AuthenticationRequest;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping(value = "/authenticate")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final AuthenticationServiceImpl authenticationService;
    private final JwtToken jwtToken;

    @PostMapping("/token")
    public ResponseEntity<Object> token(@Valid @RequestBody AuthenticationRequest authenticationRequest) throws Exception {

        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()));
        }catch (Exception ex){
           throw new Exception("Hata: "+ExceptionUtils.getStackTrace(ex.fillInStackTrace()));
        }
        UserDetails userDetails = authenticationService.loadUserByUsername(authenticationRequest.getUsername());

        String token = jwtToken.generateToken(userDetails);
        return ResponseEntity.ok(token);

    }



}
