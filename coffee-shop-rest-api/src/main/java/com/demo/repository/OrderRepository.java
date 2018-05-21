package com.demo.repository;

import com.demo.model.Customer;
import com.demo.model.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {

    List<Order> findByCustomerOrderByIdAsc(Customer customer);
    List<Order> findAllByOrderByIdAsc();

}