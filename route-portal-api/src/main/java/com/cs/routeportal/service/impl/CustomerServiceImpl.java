package com.cs.routeportal.service.impl;

import com.cs.routeportal.service.CustomerService;
import com.cs.routeportal.dto.customer.AddCustomerDto;
import com.cs.routeportal.exception.CustomerAlreadyExistException;
import com.cs.routeportal.exception.CustomerNotFoundException;
import com.cs.routeportal.model.Customer;
import com.cs.routeportal.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@AllArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Transactional
    @Override
    public Customer addCustomer(AddCustomerDto addCustomerDto) throws CustomerAlreadyExistException {
        Optional<Customer> optionalCustomer = customerRepository.findCustomerByEmail(addCustomerDto.getEmail());

        if(optionalCustomer.isPresent())
            throw new CustomerAlreadyExistException(optionalCustomer.get());

        Customer customer = new Customer();
        BeanUtils.copyProperties(addCustomerDto,customer);
        return customerRepository.save(customer);
    }

    @Override
    public Customer findCustomerByMail(String mail) {
        return customerRepository
                .findCustomerByEmail(mail).orElseThrow(()-> new CustomerNotFoundException(mail));
    }

    @Override
    public Customer findCustomerByCustomerId(String customerId) {
        return customerRepository
                .findById(customerId)
                .orElseThrow(()-> new RuntimeException(String.format("Invalid customer id: %s",customerId)));
    }
}
