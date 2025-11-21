package com.identityx.api.auth.service;

import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.appuser.service.IAppUserService;
import com.identityx.api.auth.dto.LoginRequest;
import com.identityx.api.auth.dto.LoginResponse;
import com.identityx.api.auth.mapper.AuthMapper;
import com.identityx.api.auth.security.IJwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

  private final IJwtUtils jwtUtils;
  private final AuthenticationManager authenticationManager;
  private final IAppUserService appUserService;

  @Override
  public Pair<LoginResponse, String> login(LoginRequest loginRequest) {

    Authentication authentication = UsernamePasswordAuthenticationToken
            .unauthenticated(loginRequest.username(), loginRequest.password());

    Authentication authenticated = authenticationManager.authenticate(authentication);
    LoginResponse loginResponse = new LoginResponse();
    String accessToken = "";

    if (authenticated.isAuthenticated()) {
      accessToken = jwtUtils.generateJwtToken(authentication);
      AppUser appUser = appUserService.getAppUserByUsername(loginRequest.username());
      AuthMapper.toLoginResponse(appUser, loginResponse);
      return Pair.of(loginResponse, accessToken);
    }

    return Pair.of(loginResponse, accessToken);
  }
}
