package com.identityx.api.auth.web.dto;

import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshTokenResponse {
  private String refreshToken;
  private Instant expiryDate;
}
