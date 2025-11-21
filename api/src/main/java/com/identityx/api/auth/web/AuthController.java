package com.identityx.api.auth.web;

import com.identityx.api.auth.dto.LoginRequest;
import com.identityx.api.auth.dto.LoginResponse;
import com.identityx.api.auth.service.IAuthService;
import com.identityx.api.common.dto.AppResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequiredArgsConstructor
public class AuthController {

  private final IAuthService authService;

  @PostMapping("/login")
  public ResponseEntity<AppResponse<LoginResponse>> login(@RequestBody LoginRequest loginRequest) {

    Pair<LoginResponse, String> loginResponse = authService.login(loginRequest);
    AppResponse<LoginResponse> response = new AppResponse<>(HttpStatus.OK,
            loginResponse.getFirst(), "Login successful");
    ResponseCookie cookie = ResponseCookie.from("jwt", loginResponse.getSecond()).httpOnly(true).path("/")
            .secure(false).maxAge(Duration.ofDays(1)).sameSite("Strict").build();
    return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, cookie.toString()).body(response);
  }

}
