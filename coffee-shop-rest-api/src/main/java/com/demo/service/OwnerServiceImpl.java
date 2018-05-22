package com.demo.service;

import com.demo.model.SpecialResponse;
import com.demo.model.Owner;
import com.demo.repository.OwnerRepository;
import com.demo.utils.SignInUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;

    @Autowired
    public OwnerServiceImpl(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    @Override
    public ResponseEntity<SpecialResponse> getOwners() {
        List<Owner> owners;
        SpecialResponse specialResponse;

        try {
            owners = (List<Owner>) ownerRepository.findAll();
            specialResponse = new SpecialResponse().data(owners).type(SpecialResponse.TypeEnum.SUCCESS).message("SUCCESS!");
            return new ResponseEntity<>(specialResponse, HttpStatus.OK);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("DOES_NOT_EXIST: There is no owner in the system!");
            return new ResponseEntity<>(specialResponse, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public Owner getOwnerById(long id) {
        return ownerRepository.findOne(id);
    }

    @Override
    public ResponseEntity<SpecialResponse> saveOwner(Owner owner) {
        SpecialResponse specialResponse;
        try {
            Owner ow = ownerRepository.getOwnerByUsername(owner.getUsername());
            if (ow != null) {
                specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("BAD_REQUEST: This username is already taken!");
                return new ResponseEntity<>(specialResponse, HttpStatus.BAD_REQUEST);
            }
            ownerRepository.save(owner);
            specialResponse = new SpecialResponse().data(owner).type(SpecialResponse.TypeEnum.SUCCESS).message("CREATED: Your account created successfully!");
            return new ResponseEntity<>(specialResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            specialResponse = new SpecialResponse().data(null).type(SpecialResponse.TypeEnum.ERROR).message("ERROR: Database problem!");
            return new ResponseEntity<>(specialResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Owner checkUsernameAndPassword(String username, String suppliantPassword) {
        SignInUtil signInUtil = new SignInUtil();

        try {
            Owner owner = ownerRepository.getOwnerByUsername(username);

            if (owner == null) {
                return null;
            }

            return (Owner) signInUtil.checkPassword(suppliantPassword, owner);

        } catch (Exception e) {
            return null;
        }
    }
}
