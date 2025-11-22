package com.identityx.api.auth.security;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RefreshTokenProvider implements IRefreshTokenProvider {

  @Value("${jwt.refresh.expiration.ms}")
  private Long refreshTokenDurationMs;

  private final SecureRandom secureRandom = new SecureRandom();
  private final Base64.Encoder base64Encoder = Base64.getUrlEncoder();

  @Override
  public String generateToken() {
    byte[] randomBytes = new byte[32];
    secureRandom.nextBytes(randomBytes);
    return base64Encoder.withoutPadding().encodeToString(randomBytes);
  }

  @Override
  public Instant generateExpiryDate() {
    return Instant.now().plusMillis(refreshTokenDurationMs);
  }

  @Override
  public boolean isTokenExpired(Instant expiryDate) {
    return expiryDate.compareTo(Instant.now()) < 0;
  }
}
