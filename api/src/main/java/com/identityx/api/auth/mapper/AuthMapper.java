package com.identityx.api.auth.mapper;

import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.auth.dto.LoginResponse;

public final class AuthMapper {

  private AuthMapper() {}

  public static void toLoginResponse(AppUser appUser, LoginResponse loginResponse) {
    loginResponse.setUsername(appUser.getUsername());
    loginResponse.setEmail(appUser.getEmail());
    loginResponse.setUserId(appUser.getUserId());
  }

}
