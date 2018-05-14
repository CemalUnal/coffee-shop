package com.demo.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;

@Entity
@Table(name="orders")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Order extends BaseEntity {

    @Column(name = "neworsent", nullable = false)
    private String neworsent;

    @Column(name = "orderdate", nullable = false)
    private String orderdate;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer_id;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product_id;

    public String getNewOrSent() {
        return neworsent;
    }

    public void setNewOrSent(String neworsent) {
        this.neworsent = neworsent;
    }

    public Customer getCustomer() {
        return customer_id;
    }

    public void setCustomer(Customer customer_id) {
        this.customer_id = customer_id;
    }

    public Product getProduct() {
        return product_id;
    }

    public void setProduct(Product product_id) {
        this.product_id = product_id;
    }

    public String getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(String orderdate) {
        this.orderdate = orderdate;
    }
}
