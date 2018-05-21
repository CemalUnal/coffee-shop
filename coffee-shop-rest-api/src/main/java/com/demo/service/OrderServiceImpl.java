package com.demo.service;

import com.demo.model.Customer;
import com.demo.model.Order;
import com.demo.model.SpecialResponse;
import com.demo.repository.CustomerRepository;
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
    private final CustomerRepository customerRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
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
    public ResponseEntity<SpecialResponse> getOrderById(long id) {
        SpecialResponse specialResponse;

        try {
            Order order = orderRepository.findOne(id);

            if (order == null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR)
                        .message("DOES_NOT_EXIST: This order id does not exist!");
                return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
            }

            specialResponse = new SpecialResponse().data(order).type(SpecialResponse.TypeEnum.SUCCESS).message("SUCCESS!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);

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
            orders = orderRepository.findAllByOrderByIdAsc();

            if (orders == null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR)
                        .message("DOES_NOT_EXIST: There is no order yet!");
                return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
            }

            specialResponse = new SpecialResponse().data(orders).type(SpecialResponse.TypeEnum.SUCCESS).message("SUCCESS!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: There is no order in the system!");
            return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<SpecialResponse> updateOrder(long id, Order newOrder) {
        SpecialResponse specialResponse;
        try {
            Order order = orderRepository.findOne(id);

            if (order == null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR)
                        .message("DOES_NOT_EXIST: This order does not exist!");
                return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
            }

            order.setNewOrSent(newOrder.getNewOrSent());
            orderRepository.save(order);

            specialResponse = new SpecialResponse().data(order).type(SpecialResponse.TypeEnum.SUCCESS)
                    .message("UPDATED: Order is updated successfully!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR)
                    .message("ERROR: Database problem!");
            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<SpecialResponse> getOrderByCustomerId(long id) {
        SpecialResponse specialResponse;
        List<Order> orders = null;
        try {

            Customer customer = customerRepository.findOne(id);
            if (customer != null)
                orders = orderRepository.findByCustomerOrderByIdAsc(customer);

            if (orders == null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR)
                        .message("DOES_NOT_EXIST: This customer does not have an order yet!");
                return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
            }

            specialResponse = new SpecialResponse().data(orders).type(SpecialResponse.TypeEnum.SUCCESS)
                    .message("SUCCESS!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);

        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR)
                    .message("ERROR: Database problem!");
            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
