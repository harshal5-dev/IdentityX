package com.identityx.api.address.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressReqRes {

  private String street;
  private String city;
  private String state;
  private String postalCode;
  private String country;
  private String phoneNumber;
  private Boolean isPrimary;
  private String type;

}
