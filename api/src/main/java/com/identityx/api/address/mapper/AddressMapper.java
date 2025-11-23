package com.identityx.api.address.mapper;

import com.identityx.api.address.model.Address;
import com.identityx.api.address.web.dto.AddressReqRes;

public final class AddressMapper {

  private AddressMapper() {}

  public static AddressReqRes toAddressReqRes(Address address) {
    AddressReqRes addressReqRes = new AddressReqRes();
    addressReqRes.setStreet(address.getStreet());
    addressReqRes.setCity(address.getCity());
    addressReqRes.setState(address.getState());
    addressReqRes.setPostalCode(address.getPostalCode());
    addressReqRes.setCountry(address.getCountry());
    addressReqRes.setPhoneNumber(address.getPhoneNumber());
    addressReqRes.setIsPrimary(address.getIsPrimary());
    return addressReqRes;
  }

  public static void toAddress(AddressReqRes addressReqRes, Address address) {
    address.setStreet(addressReqRes.getStreet());
    address.setCity(addressReqRes.getCity());
    address.setState(addressReqRes.getState());
    address.setPostalCode(addressReqRes.getPostalCode());
    address.setCountry(addressReqRes.getCountry());
    address.setPhoneNumber(addressReqRes.getPhoneNumber());
    address.setIsPrimary(addressReqRes.getIsPrimary());
  }
}
