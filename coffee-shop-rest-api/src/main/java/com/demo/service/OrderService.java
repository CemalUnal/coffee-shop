package com.demo.service;

import com.demo.model.Order;
import com.demo.model.SpecialResponse;
import org.springframework.http.ResponseEntity;

public interface OrderService {

    ResponseEntity<SpecialResponse> makeOrder(Order order);
    ResponseEntity<SpecialResponse> getOrderById(long id);
    ResponseEntity<SpecialResponse> getOrders();
    ResponseEntity<SpecialResponse> updateOrder(long id, Order newOrder);
    ResponseEntity<SpecialResponse> getOrderByCustomerId(long id);
}
