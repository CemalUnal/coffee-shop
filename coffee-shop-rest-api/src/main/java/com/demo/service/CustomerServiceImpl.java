package com.demo.service;

import com.demo.model.Customer;
import com.demo.model.SpecialResponse;
import com.demo.model.User;
import com.demo.repository.CustomerRepository;
import com.demo.utils.SignInUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public ResponseEntity<SpecialResponse> getCustomers() {
        List<Customer> customers;
        SpecialResponse specialResponse;

        try {
            customers = (List<Customer>) customerRepository.findAll();
            specialResponse = new SpecialResponse().data(customers).type(SpecialResponse.TypeEnum.SUCCESS).message("SUCCESS!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: There is no customer in the system!");
            return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public Customer getCustomerById(long id) {
        return customerRepository.findOne(id);
    }

    @Override
    public ResponseEntity<SpecialResponse> saveCustomer(Customer customer) {
        SpecialResponse specialResponse;

        try {
            Customer c = customerRepository.getCustomerByUsername(customer.getUsername());

            if (c != null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR)
                        .message("BAD_REQUEST: This username is already taken!");

                return new ResponseEntity<>(specialResponse, HttpStatus.BAD_REQUEST);
            }

            customerRepository.save(customer);

            specialResponse = new SpecialResponse().data(customer).type(SpecialResponse.TypeEnum.SUCCESS)
                    .message("CREATED: Your account created successfully!");

            return new ResponseEntity<>(specialResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR)
                    .message("ERROR: Database problem!");

            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<SpecialResponse> deleteCustomer(long id) {
        SpecialResponse specialResponse;

        try {
            Customer customer = getCustomerById(id);
            if (customer == null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: This customer does not exist!");
                return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
            }
            customerRepository.delete(id);
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.SUCCESS).message("Success!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("ERROR: Database problem!");
            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<SpecialResponse> updateCustomer(long id, Customer newCustomer) {
        SpecialResponse specialResponse;
        try {
            Customer customer = getCustomerById(id);

            if (customer == null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: This customer does not exist!");
                return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
            }

            customer.setPassword(newCustomer.getPassword());
            customer.setRealname(newCustomer.getRealname());
            customer.setSurname(newCustomer.getSurname());
            customer.setFloorno(newCustomer.getFloorno());
            customer.setBuildingno(newCustomer.getBuildingno());
            customer.setRoomno(newCustomer.getRoomno());
            customerRepository.save(customer);

            specialResponse = new SpecialResponse().data(customer).type(SpecialResponse.TypeEnum.SUCCESS).message("UPDATED: Customer is updated successfully!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("ERROR: Database problem!");
            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Customer checkUsernameAndPassword(String username, String suppliantPassword) {
        SignInUtil signInUtil = new SignInUtil();

        try {
            Customer customer = customerRepository.getCustomerByUsername(username);

            if (customer == null) {
                return null;
            }

            return (Customer) signInUtil.checkPassword(suppliantPassword, customer);

        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Customer userIsCustomer(String username) {
        return customerRepository.getCustomerByUsername(username);
    }
}
