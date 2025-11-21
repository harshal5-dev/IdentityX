package com.identityx.api.auth.service;

import com.identityx.api.auth.dto.LoginRequest;
import com.identityx.api.auth.dto.LoginResponse;
import org.springframework.data.util.Pair;

public interface IAuthService {

  Pair<LoginResponse, String> login(LoginRequest loginRequest);

}
