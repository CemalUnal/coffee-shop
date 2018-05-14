package com.demo.controller;

import com.demo.model.SpecialResponse;
import com.demo.model.Product;
import com.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path="/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<SpecialResponse> getAllProducts() throws Exception {
        return productService.getProducts();
    }

    @PostMapping("saveproduct")
    public ResponseEntity<SpecialResponse> addProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @DeleteMapping("deleteproduct/{productId}")
    public ResponseEntity<SpecialResponse> deleteProduct(@PathVariable("productId") Integer productId) {
        return productService.deleteProduct(productId);
    }

    @PutMapping("editproduct/{productId}")
    public ResponseEntity<SpecialResponse> editProduct(@PathVariable("productId") Integer productId, @RequestBody Product product) {
        return productService.updateProduct(productId, product.getProductname());
    }
}
