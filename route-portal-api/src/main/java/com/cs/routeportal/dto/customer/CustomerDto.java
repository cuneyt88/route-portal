package com.cs.routeportal.dto.customer;

import com.cs.routeportal.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {

    private String customerId;
    private String firstName;
    private String lastName;
    private String email;
    private Address address;
    private String createdBy;
    private LocalDate createdDate;

}
