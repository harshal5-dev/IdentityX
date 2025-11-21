package com.identityx.api.appuser.model;


import com.identityx.api.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "app_user")
public class AppUser extends BaseEntity {

  @Column(name ="user_id", nullable = false, unique = true, length = 500)
  private UUID userId;

  @Column(name = "first_name", nullable = false ,length = 300)
  private String firstName;

  @Column(name = "middle_name", length = 300)
  private String middleName;

  @Column(name = "last_name" ,length = 300)
  private String lastName;

  @Column(name = "username", nullable = false, unique = true)
  private String username;

  @Column(name = "email", nullable = false, unique = true, length = 500)
  private String email;

  @Column(name = "password", nullable = false, length = 500)
  private String password;
}
