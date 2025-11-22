package com.identityx.api.appuser.web.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppUserInfoResponse {

  private String username;
  private String email;
  private UUID userId;
  private String firstName;
  private String lastName;
  private String middleName;

}
