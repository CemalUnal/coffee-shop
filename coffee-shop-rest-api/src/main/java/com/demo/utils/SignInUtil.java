package com.demo.utils;

import com.demo.model.User;

public class SignInUtil {

    public User checkPassword(String suppliantPassword, User registeredUser) {
        if (suppliantPassword.equals(registeredUser.getPassword())) {
            return registeredUser;
        }

        return null;
    }
}
