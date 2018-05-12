package com.demo.service;

import com.demo.model.SpecialResponse;
import com.demo.model.Product;
import com.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ResponseEntity<SpecialResponse> getProducts() {
        List<Product> products;
        SpecialResponse specialResponse;

        try {
            products = (List<Product>) productRepository.findAll();
            specialResponse = new SpecialResponse().data(products).type(SpecialResponse.TypeEnum.SUCCESS).message("SUCCESS!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: There is no product in the system!");
            return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<SpecialResponse> saveProduct(Product product) {
        SpecialResponse specialResponse;
        try {
            Product p = productRepository.getProductByProductname(product.getProductname());

            if (p != null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("BAD_REQUEST: This product is already added to the system!");
                return new ResponseEntity<>(specialResponse, HttpStatus.BAD_REQUEST);
            }

            productRepository.save(product);
            specialResponse = new SpecialResponse().data(product).type(SpecialResponse.TypeEnum.SUCCESS).message("CREATED: This product added to the system successfully!");
            return new ResponseEntity<>(specialResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("ERROR: Database problem!");
            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<SpecialResponse> deleteProduct(long id) {
        SpecialResponse specialResponse;
        try {
            Product product = productRepository.getProductById(id);

            if (product == null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: This product does not exist!");
                return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
            }

            productRepository.delete(id);
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.SUCCESS).message("Success!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("ERROR: Database problem!");
            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<SpecialResponse> updateProduct(long id, String newProduct) {
        SpecialResponse specialResponse;
        try {
            Product product = productRepository.getProductById(id);

            if (product == null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: This product does not exist!");
                return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
            }

            if (product.getProductname().equalsIgnoreCase(newProduct)) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.WARNING).message("WARNING: Product name is same!");
                return new ResponseEntity<>(specialResponse, HttpStatus.BAD_REQUEST);
            }

            product.setProductname(newProduct);
            productRepository.save(product);

            specialResponse = new SpecialResponse().data(product).type(SpecialResponse.TypeEnum.SUCCESS).message("UPDATED: Product is updated successfully!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("ERROR: Database problem!");
            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
