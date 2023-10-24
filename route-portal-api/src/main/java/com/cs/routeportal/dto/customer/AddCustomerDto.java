package com.cs.routeportal.dto.customer;

import com.cs.routeportal.model.Address;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class AddCustomerDto {

    @NotEmpty(message="First name may not be empty")
    private String firstName;

    @NotEmpty(message="Last name may not be empty")
    private String lastName;

    @Email(message = "Must be a valid email")
    private String email;

    @NotNull(message = "Address cannot be null")
    private Address address;
}
