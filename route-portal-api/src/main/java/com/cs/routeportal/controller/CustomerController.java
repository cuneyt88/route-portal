package com.cs.routeportal.controller;

import com.cs.routeportal.service.CustomerService;
import com.cs.routeportal.dto.customer.AddCustomerDto;
import com.cs.routeportal.dto.customer.CustomerDto;
import com.cs.routeportal.exception.CustomerAlreadyExistException;
import com.cs.routeportal.model.Customer;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping(value = "/customers")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/add")
    public ResponseEntity<CustomerDto> addCustomer(@Valid @RequestBody AddCustomerDto addCustomerDto) throws CustomerAlreadyExistException {

        Customer customer = customerService.addCustomer(addCustomerDto);
        CustomerDto customerDto = new CustomerDto();
        BeanUtils.copyProperties(customer, customerDto);

        return ResponseEntity.ok(customerDto);
    }
}
