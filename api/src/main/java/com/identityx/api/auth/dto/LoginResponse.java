package com.identityx.api.auth.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class LoginResponse {
  private String username;
  private String email;
  private UUID userId;
}
