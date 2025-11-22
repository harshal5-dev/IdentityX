package com.identityx.api.auth.service;

import org.springframework.data.util.Pair;
import com.identityx.api.auth.dto.LoginRequest;
import com.identityx.api.auth.dto.LoginResponse;

public interface IAuthService {

  Pair<LoginResponse, String> login(LoginRequest loginRequest);

}
