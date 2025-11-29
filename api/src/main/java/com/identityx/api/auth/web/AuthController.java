package com.identityx.api.auth.web;

import java.util.UUID;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.identityx.api.auth.constants.AuthConstants;
import com.identityx.api.auth.service.IAuthService;
import com.identityx.api.auth.service.IRefreshTokenService;
import com.identityx.api.auth.web.dto.AppUserDetails;
import com.identityx.api.auth.web.dto.LoginRequest;
import com.identityx.api.auth.web.dto.LoginResponse;
import com.identityx.api.auth.web.dto.RefreshTokenResponse;
import com.identityx.api.common.dto.AppResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

  private final IAuthService authService;
  private final IRefreshTokenService refreshTokenService;

  @PostMapping("/login")
  public ResponseEntity<AppResponse<LoginResponse>> login(@RequestBody LoginRequest loginRequest) {

    Pair<LoginResponse, String> loginResult = authService.login(loginRequest);
    LoginResponse loginResponse = loginResult.getFirst();
    String accessToken = loginResult.getSecond();
    RefreshTokenResponse refreshTokenResponse =
        refreshTokenService.createRefreshToken(loginResponse.getUserId());

    AppResponse<LoginResponse> response =
        new AppResponse<>(HttpStatus.OK, loginResponse, "Login successful");

    ResponseCookie jwtCookie = ResponseCookie.from(AuthConstants.AUTHORIZATION_COOKIE, accessToken)
        .httpOnly(true).path("/").secure(false).maxAge(360000 / 1000).sameSite("Strict").build();

    ResponseCookie refreshCookie = ResponseCookie
        .from(AuthConstants.REFRESH_TOKEN_COOKIE, refreshTokenResponse.getRefreshToken())
        .httpOnly(true).path("/").secure(false).maxAge(86400).sameSite("Strict").build();

    return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .header(HttpHeaders.SET_COOKIE, refreshCookie.toString()).body(response);
  }

  @GetMapping("/is-Authenticated")
  public ResponseEntity<AppResponse<Boolean>> isAuthenticated(Authentication authentication) {
    if (authentication == null || !authentication.isAuthenticated()) {
      return ResponseEntity
          .ok(new AppResponse<>(HttpStatus.OK, false, "User is not authenticated"));
    }
    return ResponseEntity.ok(new AppResponse<>(HttpStatus.OK, true, "User is authenticated"));
  }


  @PostMapping("/refresh-token")
  public ResponseEntity<AppResponse<Void>> refreshToken(HttpServletRequest request) {
    String refreshToken = getCookieValue(request, AuthConstants.REFRESH_TOKEN_COOKIE);

    if (refreshToken != null && !refreshToken.isEmpty()) {
      Pair<String, String> tokens = refreshTokenService.refreshAccessToken(refreshToken);
      String newAccessToken = tokens.getFirst();
      String newRefreshToken = tokens.getSecond();

      ResponseCookie jwtCookie =
          ResponseCookie.from(AuthConstants.AUTHORIZATION_COOKIE, newAccessToken).httpOnly(true)
              .path("/").secure(false).maxAge(360000 / 1000).sameSite("Strict").build();
      ResponseCookie refreshCookie =
          ResponseCookie.from(AuthConstants.REFRESH_TOKEN_COOKIE, newRefreshToken).httpOnly(true)
              .path("/").secure(false).maxAge(86400).sameSite("Strict").build();
      AppResponse<Void> response =
          new AppResponse<>(HttpStatus.OK, null, "Token refreshed successfully");
      return ResponseEntity.status(HttpStatus.OK)
          .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
          .header(HttpHeaders.SET_COOKIE, refreshCookie.toString()).body(response);
    }

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(new AppResponse<>(HttpStatus.BAD_REQUEST, null, "Refresh token is missing"));
  }

  @PostMapping("/logout")
  public ResponseEntity<AppResponse<Void>> logout() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof AppUserDetails) {
      UUID userId = ((AppUserDetails) principal).getUserId();
      refreshTokenService.deleteByUserId(userId);
    }

    ResponseCookie jwtCookie = ResponseCookie.from(AuthConstants.AUTHORIZATION_COOKIE, "")
        .httpOnly(true).path("/").secure(false).maxAge(0).sameSite("Strict").build();

    ResponseCookie refreshCookie = ResponseCookie.from(AuthConstants.REFRESH_TOKEN_COOKIE, "")
        .httpOnly(true).path("/").secure(false).maxAge(0).sameSite("Strict").build();

    AppResponse<Void> response = new AppResponse<>(HttpStatus.OK, null, "Logout successful");
    return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .header(HttpHeaders.SET_COOKIE, refreshCookie.toString()).body(response);
  }

  private String getCookieValue(HttpServletRequest request, String cookieName) {
    if (request.getCookies() != null) {
      for (Cookie cookie : request.getCookies()) {
        if (cookie.getName().equals(cookieName)) {
          return cookie.getValue();
        }
      }
    }
    return null;
  }

}
