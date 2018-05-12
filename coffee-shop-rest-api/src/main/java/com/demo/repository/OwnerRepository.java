package com.demo.repository;

import com.demo.model.Owner;
import org.springframework.data.repository.CrudRepository;

public interface OwnerRepository extends CrudRepository<Owner, Long> {

    Owner getOwnerByUsername(String username);
}
