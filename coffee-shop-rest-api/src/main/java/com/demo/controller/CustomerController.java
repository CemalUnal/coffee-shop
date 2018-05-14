package com.demo.controller;

import com.demo.model.Customer;
import com.demo.model.SpecialResponse;
import com.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path="/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<SpecialResponse> getCustomers() throws Exception {
        return customerService.getCustomers();
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable("customerId") Integer customerId) throws Exception {
        Customer customer = customerService.getCustomerById(customerId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @PostMapping("savecustomer")
    public ResponseEntity<SpecialResponse> addCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    @PostMapping("signin")
    public ResponseEntity<SpecialResponse> signIn(@RequestBody Customer customer) {
        return customerService.signIn(customer);
    }

    @DeleteMapping("deletecustomer/{customerId}")
    public ResponseEntity<SpecialResponse> deleteCustomer(@PathVariable("customerId") Integer customerId) {
        return customerService.deleteCustomer(customerId);
    }

    @PutMapping("editcustomer/{customerId}")
    public ResponseEntity<SpecialResponse> editCustomer(@PathVariable("customerId") Integer customerId, @RequestBody Customer customer) {
        return customerService.updateCustomer(customerId, customer);
    }
}
