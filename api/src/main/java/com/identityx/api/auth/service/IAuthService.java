package com.identityx.api.auth.service;

import org.springframework.data.util.Pair;
import com.identityx.api.auth.web.dto.LoginRequest;
import com.identityx.api.auth.web.dto.LoginResponse;

public interface IAuthService {

  Pair<LoginResponse, String> login(LoginRequest loginRequest);

}
