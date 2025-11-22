package com.identityx.api.auth.security;

import com.identityx.api.auth.dto.AppUserDetails;
import com.identityx.api.auth.dto.ValidateJWTTokenResponse;

public interface IJwtTokenProvider {

  String generateJwtToken(AppUserDetails appUserDetails);

  ValidateJWTTokenResponse validateJwtToken(String accessToken);
}
