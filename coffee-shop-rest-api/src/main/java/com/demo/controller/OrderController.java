package com.demo.controller;

import com.demo.model.Order;
import com.demo.model.SpecialResponse;
import com.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path="/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("makeorder")
    public ResponseEntity<SpecialResponse> makeOrder(@RequestBody Order order) {
        return orderService.makeOrder(order);
    }

    @GetMapping
    public ResponseEntity<SpecialResponse> getOrders() throws Exception {
        return orderService.getOrders();
    }
}
