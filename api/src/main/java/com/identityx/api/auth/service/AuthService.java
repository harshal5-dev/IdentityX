package com.identityx.api.auth.service;

import org.springframework.data.util.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.identityx.api.auth.dto.AppUserDetails;
import com.identityx.api.auth.dto.LoginRequest;
import com.identityx.api.auth.dto.LoginResponse;
import com.identityx.api.auth.mapper.AuthMapper;
import com.identityx.api.auth.security.IJwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService implements IAuthService {

  private final AuthenticationManager authenticationManager;
  private final IJwtTokenProvider jwtTokenProvider;

  @Override
  public Pair<LoginResponse, String> login(LoginRequest loginRequest) {

    Authentication authentication = UsernamePasswordAuthenticationToken
        .unauthenticated(loginRequest.username(), loginRequest.password());

    Authentication authenticated = authenticationManager.authenticate(authentication);
    LoginResponse loginResponse = new LoginResponse();
    String accessToken = "";

    if (authenticated.isAuthenticated()) {
      AppUserDetails appUserDetails = (AppUserDetails) authenticated.getPrincipal();
      accessToken = jwtTokenProvider.generateJwtToken(appUserDetails);


      AuthMapper.toLoginResponse(appUserDetails, loginResponse);
      return Pair.of(loginResponse, accessToken != null ? accessToken : "");
    }

    return Pair.of(loginResponse, accessToken);
  }
}
