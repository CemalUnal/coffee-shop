package com.demo.controller;

import com.demo.model.Customer;
import com.demo.model.Owner;
import com.demo.model.SpecialResponse;
import com.demo.model.User;
import com.demo.service.CustomerService;
import com.demo.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path="/signin")
public class BaseController {

    private final CustomerService customerService;
    private final OwnerService ownerService;

    @Autowired
    public BaseController(CustomerService customerService, OwnerService ownerService) {
        this.customerService = customerService;
        this.ownerService = ownerService;
    }

    @PostMapping
    public ResponseEntity<SpecialResponse> signIn(@RequestBody User user) {
        SpecialResponse specialResponse;

        Customer customer = customerService.checkUsernameAndPassword(user.getUsername(), user.getPassword());
        Owner owner = ownerService.checkUsernameAndPassword(user.getUsername(), user.getPassword());

        if (customer == null && owner == null) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: This user does not exist!");
            return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
        } else if (customer != null) {
            specialResponse = new SpecialResponse().data(customer).type(SpecialResponse.TypeEnum.SUCCESS).message("SUCCESS!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } else {
            specialResponse = new SpecialResponse().data(owner).type(SpecialResponse.TypeEnum.SUCCESS).message("SUCCESS!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        }
    }
}
