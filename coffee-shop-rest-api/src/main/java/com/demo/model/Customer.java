package com.demo.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Customer extends User {

    @Column(name = "floorno", nullable = false)
    private Integer floorno;

    @Column(name = "buildingno", nullable = false)
    private Integer buildingno;

    @Column(name = "roomno", nullable = false)
    private Integer roomno;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "customer", fetch = FetchType.EAGER)
    private Set<Order> orders = new HashSet<>();

    public Integer getFloorno() {
        return floorno;
    }

    public void setFloorno(Integer floorno) {
        this.floorno = floorno;
    }

    public Integer getBuildingno() {
        return buildingno;
    }

    public void setBuildingno(Integer buildingno) {
        this.buildingno = buildingno;
    }

    public Integer getRoomno() {
        return roomno;
    }

    public void setRoomno(Integer roomno) {
        this.roomno = roomno;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }
}