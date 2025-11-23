package com.identityx.api.address.service;

import java.util.List;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import com.identityx.api.address.mapper.AddressMapper;
import com.identityx.api.address.model.Address;
import com.identityx.api.address.repo.AddressRepository;
import com.identityx.api.address.web.dto.AddressReqRes;
import com.identityx.api.appuser.service.IAppUserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressService implements IAddressService {

  private final AddressRepository addressRepository;
  private final IAppUserService appUserService;

  @Override
  public List<AddressReqRes> getAddressesByAppUserId(Long appUserId) {
    List<Address> addresses = addressRepository.findByAppUserId(appUserId);
    return addresses.stream().map(AddressMapper::toAddressReqRes).toList();
  }

  @Override
  public AddressReqRes createAddress(@NonNull Long appUserId, AddressReqRes addressReqRes) {
    Address address = new Address();
    AddressMapper.toAddress(addressReqRes, address);
    address.setAppUser(appUserService.getAppUserById(appUserId));
    Address savedAddress = addressRepository.save(address);
    return AddressMapper.toAddressReqRes(savedAddress);
  }
}
