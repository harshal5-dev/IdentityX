package com.identityx.api.auth.service;

import com.identityx.api.auth.dto.LoginRequest;
import com.identityx.api.auth.dto.LoginResponse;

public interface IAuthService {

  LoginResponse login(LoginRequest loginRequest);

}
