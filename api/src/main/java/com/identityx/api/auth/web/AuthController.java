package com.identityx.api.auth.web;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.identityx.api.auth.constants.AuthConstants;
import com.identityx.api.auth.dto.LoginRequest;
import com.identityx.api.auth.dto.LoginResponse;
import com.identityx.api.auth.service.IAuthService;
import com.identityx.api.common.dto.AppResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {

  private final IAuthService authService;

  @PostMapping("/login")
  public ResponseEntity<AppResponse<LoginResponse>> login(@RequestBody LoginRequest loginRequest) {

    LoginResponse loginResponse = authService.login(loginRequest);
    AppResponse<LoginResponse> response =
        new AppResponse<>(HttpStatus.OK, loginResponse, "Login successful");
    ResponseCookie cookie =
        ResponseCookie.from(AuthConstants.AUTHORIZATION_COOKIE, loginResponse.getAccessToken())
            .httpOnly(true).path("/").secure(false).maxAge(86400).sameSite("Strict").build();
    return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(response);
  }

  @PostMapping("/logout")
  public ResponseEntity<AppResponse<Void>> logout() {
    ResponseCookie cookie = ResponseCookie.from(AuthConstants.AUTHORIZATION_COOKIE, "")
        .httpOnly(true).path("/").secure(false).maxAge(0).sameSite("Strict").build();

    AppResponse<Void> response = new AppResponse<>(HttpStatus.OK, null, "Logout successful");
    return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(response);
  }

}
