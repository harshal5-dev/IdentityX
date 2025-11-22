package com.identityx.api.auth.mapper;

import com.identityx.api.auth.dto.AppUserDetails;
import com.identityx.api.auth.dto.LoginResponse;
import com.identityx.api.auth.dto.RefreshTokenResponse;
import com.identityx.api.auth.model.RefreshToken;

public final class AuthMapper {

  private AuthMapper() {}

  public static void toLoginResponse(AppUserDetails appUserDetails, LoginResponse loginResponse) {
    loginResponse.setUsername(appUserDetails.getUsername());
    loginResponse.setEmail(appUserDetails.getEmail());
    loginResponse.setUserId(appUserDetails.getUserId());
  }

  public static RefreshTokenResponse toRefreshTokenResponse(RefreshToken refreshToken) {
    RefreshTokenResponse refreshTokenResponse = new RefreshTokenResponse();
    refreshTokenResponse.setRefreshToken(refreshToken.getToken());
    refreshTokenResponse.setExpiryDate(refreshToken.getExpiryDate());
    return refreshTokenResponse;
  }

}
