package com.identityx.api.appuser.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class RegisterAppUserRes {

  private UUID userId;
  private String username;
  private String email;
  private String firstName;
  private String lastName;
}
