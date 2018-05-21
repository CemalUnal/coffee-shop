package com.demo.repository;

import com.demo.model.Customer;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    Customer getCustomerByUsername(String username);
    List<Customer> findAllByOrderByIdAsc();
}
