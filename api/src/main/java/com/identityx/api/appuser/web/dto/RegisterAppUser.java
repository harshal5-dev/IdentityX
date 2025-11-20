package com.identityx.api.appuser.web.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterAppUser {

  @NotEmpty(message = "Username is required")
  @Pattern(regexp = "^[a-zA-Z0-9._%+-]{3,}$",
          message = "Username should be at least 3 characters long and can contain letters, numbers, dots, underscores, and hyphens")
  private String username;

  @NotEmpty(message = "Password is required")
  private String password;

  @NotEmpty(message = "Email is required")
  @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          message = "Email should be valid")
  private String email;

  @NotEmpty(message = "First name is required")
  private String firstName;

  private String lastName;
}
