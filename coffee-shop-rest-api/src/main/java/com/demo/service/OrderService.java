package com.demo.service;

import com.demo.model.Order;
import com.demo.model.SpecialResponse;
import org.springframework.http.ResponseEntity;

public interface OrderService {

    ResponseEntity<SpecialResponse> makeOrder(Order order);
    ResponseEntity<SpecialResponse> getOrders();
}
