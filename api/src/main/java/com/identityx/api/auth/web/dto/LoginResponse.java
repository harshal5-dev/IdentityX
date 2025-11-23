package com.identityx.api.auth.web.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
  private String username;
  private String email;
  private UUID userId;
}
