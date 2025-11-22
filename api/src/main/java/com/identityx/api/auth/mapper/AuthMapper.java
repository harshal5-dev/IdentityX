package com.identityx.api.auth.mapper;

import com.identityx.api.auth.dto.AppUserDetails;
import com.identityx.api.auth.dto.LoginResponse;

public final class AuthMapper {

  private AuthMapper() {}

  public static void toLoginResponse(AppUserDetails appUserDetails, LoginResponse loginResponse) {
    loginResponse.setUsername(appUserDetails.getUsername());
    loginResponse.setEmail(appUserDetails.getEmail());
    loginResponse.setUserId(appUserDetails.getUserId());
  }

}
