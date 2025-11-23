package com.identityx.api.auth.service;

import java.util.UUID;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.appuser.service.IAppUserService;
import com.identityx.api.auth.mapper.AuthMapper;
import com.identityx.api.auth.model.RefreshToken;
import com.identityx.api.auth.repo.RefreshTokenRepository;
import com.identityx.api.auth.security.IJwtTokenProvider;
import com.identityx.api.auth.security.IRefreshTokenProvider;
import com.identityx.api.auth.web.dto.AppUserDetails;
import com.identityx.api.auth.web.dto.RefreshTokenResponse;
import com.identityx.api.common.exception.TokenRefreshException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService implements IRefreshTokenService {

  private final RefreshTokenRepository refreshTokenRepository;
  private final IAppUserService appUserService;
  private final IRefreshTokenProvider refreshTokenProvider;
  private final IJwtTokenProvider jwtTokenProvider;


  @Override
  @Transactional
  public RefreshTokenResponse createRefreshToken(UUID userId) {

    AppUser appUser = appUserService.getAppUserByUserId(userId);
    refreshTokenRepository.deleteByAppUser(appUser);

    RefreshToken refreshToken = new RefreshToken();
    refreshToken.setAppUser(appUser);
    refreshToken.setExpiryDate(refreshTokenProvider.generateExpiryDate());
    refreshToken.setToken(refreshTokenProvider.generateToken());

    RefreshToken savedRefreshToken = refreshTokenRepository.save(refreshToken);

    return AuthMapper.toRefreshTokenResponse(savedRefreshToken);
  }


  @Override
  @Transactional
  public Pair<String, String> refreshAccessToken(String refreshAccessToken) {
    RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshAccessToken).orElseThrow(
        () -> new TokenRefreshException(refreshAccessToken, "Refresh token is not found!"));

    verifyExpiration(refreshToken);
    AppUser appUser = refreshToken.getAppUser();
    String accessToken = generateAccessToken(appUser);
    String refreshTokenStr = refreshToken.getToken();
    return Pair.of(accessToken != null ? accessToken : "",
        refreshTokenStr != null ? refreshTokenStr : "");
  }


  private void verifyExpiration(RefreshToken refreshToken) {
    if (refreshTokenProvider.isTokenExpired(refreshToken.getExpiryDate())) {
      refreshTokenRepository.delete(refreshToken);
      throw new TokenRefreshException(refreshToken.getToken(),
          "Refresh token was expired. Please make a new signin request");
    }
  }

  private String generateAccessToken(AppUser user) {
    AppUserDetails userDetails = new AppUserDetails(user);
    return jwtTokenProvider.generateJwtToken(userDetails);
  }

  @Transactional
  @Override
  public void deleteByUserId(UUID userId) {
    AppUser appUser = appUserService.getAppUserByUserId(userId);
    refreshTokenRepository.deleteByAppUser(appUser);
  }
}
