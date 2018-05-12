package com.demo.service;

import com.demo.model.SpecialResponse;
import com.demo.model.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {

    ResponseEntity<SpecialResponse> getProducts();
    ResponseEntity<SpecialResponse> saveProduct(Product product);
    ResponseEntity<SpecialResponse> deleteProduct(long id);
    ResponseEntity<SpecialResponse> updateProduct(long id, String newProduct);
}
