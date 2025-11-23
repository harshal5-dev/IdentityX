package com.identityx.api.auth.web.dto;

import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidateJWTTokenResponse {

  private boolean isValid;
  private String username;
  private List<GrantedAuthority> authorities;

}
