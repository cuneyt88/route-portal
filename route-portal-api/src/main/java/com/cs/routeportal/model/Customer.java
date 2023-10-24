package com.cs.routeportal.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Document("customers")
public class Customer extends BaseEntity{

    @Id
    private String customerId;
    private String firstName;
    private String lastName;

    private String email;

    private Address address;
}
