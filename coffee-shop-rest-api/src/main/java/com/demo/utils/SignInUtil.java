package com.demo.utils;

import com.demo.model.SpecialResponse;
import com.demo.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SignInUtil {

    public ResponseEntity<SpecialResponse> checkPassword(User suppliantUser, User registeredUser) {

        SpecialResponse specialResponse;

        if (suppliantUser.getPassword().equals(registeredUser.getPassword())) {
            specialResponse = new SpecialResponse().data(registeredUser)
                    .type(SpecialResponse.TypeEnum.SUCCESS)
                    .message("SUCCESS: You logged in successfully!");

            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        }

        specialResponse = new SpecialResponse().data(null)
                    .type(SpecialResponse.TypeEnum.ERROR)
                    .message("ERROR: Wrong password!");

        return new ResponseEntity<>(specialResponse, HttpStatus.BAD_REQUEST);
    }
}
