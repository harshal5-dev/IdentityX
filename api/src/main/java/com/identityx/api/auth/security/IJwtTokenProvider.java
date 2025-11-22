package com.identityx.api.auth.security;

import org.springframework.security.core.Authentication;
import com.identityx.api.auth.dto.ValidateJWTTokenResponse;

public interface IJwtTokenProvider {

  String generateJwtToken(Authentication authentication);

  ValidateJWTTokenResponse validateJwtToken(String accessToken);
}
