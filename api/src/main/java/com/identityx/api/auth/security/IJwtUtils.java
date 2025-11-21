package com.identityx.api.auth.security;

import org.springframework.security.core.Authentication;

import java.util.Date;

public interface IJwtUtils {

  String generateJwtToken(Authentication authentication);

  boolean validateJwtToken(String accessToken);

  String getUsernameFromJwtToken(String token);

  Long getUserIdFromJwtToken(String token);

  Date getExpirationDateFromJwtToken(String token);

  boolean isTokenExpired(String token);
}
