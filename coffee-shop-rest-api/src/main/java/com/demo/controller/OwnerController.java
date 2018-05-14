package com.demo.controller;

import com.demo.model.SpecialResponse;
import com.demo.model.Owner;
import com.demo.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path="/owners")
public class OwnerController {

    private final OwnerService ownerService;

    @Autowired
    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

//    @GetMapping(value="/{ownerId}", produces={MediaType.APPLICATION_JSON_VALUE})
//    public Owner getOwnerById(@PathVariable("ownerId") Integer ownerId) throws Exception {
//        return ownerService.getOwnerById(ownerId);
//    }

    @GetMapping
    public ResponseEntity<SpecialResponse> getOwners() throws Exception {
        return ownerService.getOwners();
    }

    @GetMapping("/{ownerId}")
    public ResponseEntity<Owner> getOwnerById(@PathVariable("ownerId") Integer ownerId) throws Exception {
        Owner owner = ownerService.getOwnerById(ownerId);
        return new ResponseEntity<>(owner, HttpStatus.OK);
    }

    @PostMapping("saveowner")
    public ResponseEntity<SpecialResponse> addOwner(@RequestBody Owner owner) {
        return ownerService.saveOwner(owner);
    }
}
