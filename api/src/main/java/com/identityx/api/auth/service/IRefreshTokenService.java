package com.identityx.api.auth.service;

import java.util.UUID;
import org.springframework.data.util.Pair;
import com.identityx.api.auth.web.dto.RefreshTokenResponse;

public interface IRefreshTokenService {
  RefreshTokenResponse createRefreshToken(UUID userId);

  Pair<String, String> refreshAccessToken(String refreshAccessToken);

  void deleteByUserId(UUID userId);
}
