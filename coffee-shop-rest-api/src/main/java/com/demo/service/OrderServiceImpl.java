package com.demo.service;

import com.demo.model.Customer;
import com.demo.model.Order;
import com.demo.model.SpecialResponse;
import com.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public ResponseEntity<SpecialResponse> makeOrder(Order order) {
        SpecialResponse specialResponse;
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        order.setOrderdate(dateFormat.format(new Date()));

        try {
            orderRepository.save(order);

            specialResponse = new SpecialResponse().data(order).type(SpecialResponse.TypeEnum.SUCCESS)
                    .message("CREATED: Your order is created successfully!");

            return new ResponseEntity<>(specialResponse, HttpStatus.CREATED);

        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR)
                    .message("ERROR: Database problem!");

            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<SpecialResponse> getOrders() {
        List<Order> orders;
        SpecialResponse specialResponse;

        try {
            orders = (List<Order>) orderRepository.findAll();
            specialResponse = new SpecialResponse().data(orders).type(SpecialResponse.TypeEnum.SUCCESS).message("SUCCESS!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: There is no order in the system!");
            return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
        }
    }
}
