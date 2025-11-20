package com.identityx.api.appuser.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterAppUserRes {

  private String username;
  private String email;
  private String firstName;
  private String lastName;
}
