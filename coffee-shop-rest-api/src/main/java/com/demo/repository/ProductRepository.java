package com.demo.repository;

import com.demo.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {

    Product getProductByProductname(String productname);
    Product getProductById(long id);
}