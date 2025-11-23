package com.identityx.api.address.service;

import java.util.List;
import org.springframework.lang.NonNull;
import com.identityx.api.address.web.dto.AddressReqRes;

public interface IAddressService {

  List<AddressReqRes> getAddressesByAppUserId(Long appUserId);

  AddressReqRes createAddress(@NonNull Long appUserId, AddressReqRes addressReqRes);
}
