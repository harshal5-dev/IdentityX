package com.identityx.api.address.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.identityx.api.address.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

  List<Address> findByAppUserId(Long appUserId);
}
