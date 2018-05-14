package com.demo.service;

import com.demo.model.SpecialResponse;
import com.demo.model.Owner;
import org.springframework.http.ResponseEntity;

public interface OwnerService {

    ResponseEntity<SpecialResponse> getOwners();
    Owner getOwnerById(long id);
    ResponseEntity<SpecialResponse> saveOwner(Owner owner);
    Owner checkUsernameAndPassword(String username, String suppliantPassword);
}
