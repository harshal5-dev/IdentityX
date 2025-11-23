package com.identityx.api.address.web;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.identityx.api.address.service.IAddressService;
import com.identityx.api.address.web.dto.AddressReqRes;
import com.identityx.api.auth.dto.AppUserDetails;
import com.identityx.api.common.dto.AppResponse;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

  private final IAddressService addressService;

  @GetMapping
  public ResponseEntity<AppResponse<List<AddressReqRes>>> getAddresses(
      Authentication authentication) {
    AppUserDetails appUserDetails = (AppUserDetails) authentication.getPrincipal();
    Long appUserId = appUserDetails.getId() == null ? 0L : appUserDetails.getId();
    List<AddressReqRes> addresses = addressService.getAddressesByAppUserId(appUserId);
    AppResponse<List<AddressReqRes>> response =
        new AppResponse<>(HttpStatus.OK, addresses, "Addresses retrieved successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PostMapping
  public ResponseEntity<AppResponse<AddressReqRes>> createAddress(Authentication authentication,
      @RequestBody AddressReqRes addressReqRes) {
    AppUserDetails appUserDetails = (AppUserDetails) authentication.getPrincipal();
    Long appUserId = appUserDetails.getId() == null ? 0L : appUserDetails.getId();
    AddressReqRes createdAddress = addressService.createAddress(appUserId, addressReqRes);
    AppResponse<AddressReqRes> response =
        new AppResponse<>(HttpStatus.CREATED, createdAddress, "Address created successfully");
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
