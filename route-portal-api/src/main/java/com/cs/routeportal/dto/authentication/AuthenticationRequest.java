package com.cs.routeportal.dto.authentication;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;

//@formatter:off
@Getter
@Setter
@NoArgsConstructor
//@formatter:on
public class AuthenticationRequest implements Serializable {
    @NotEmpty(message = "Username may not be empty")
    private String username;

    @NotEmpty(message="Password may not be empty")
    @Size(min=3, message = "Password should have at least 3 characters")
    private String password;
}
