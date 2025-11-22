package com.identityx.api.auth.security;

import java.time.Instant;

public interface IRefreshTokenProvider {

  String generateToken();

  Instant generateExpiryDate();

  boolean isTokenExpired(Instant expiryDate);
}
