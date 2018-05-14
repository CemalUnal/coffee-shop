package com.demo.service;

import com.demo.model.Customer;
import com.demo.model.SpecialResponse;
import org.springframework.http.ResponseEntity;

public interface CustomerService {

    ResponseEntity<SpecialResponse> getCustomers();
    Customer getCustomerById(long id);
    ResponseEntity<SpecialResponse> saveCustomer(Customer customer);
    ResponseEntity<SpecialResponse> deleteCustomer(long id);
    ResponseEntity<SpecialResponse> updateCustomer(long id, Customer newCustomer);
    ResponseEntity<SpecialResponse> signIn(Customer customer);
}
