package com.identityx.api.auth.model;

import java.time.Instant;
import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "refresh_token")
public class RefreshToken extends BaseEntity {

  @Column(nullable = false, unique = true)
  private String token;

  @OneToOne
  @JoinColumn(name = "app_user_id", referencedColumnName = "id", unique = false)
  private AppUser appUser;

  @Column(nullable = false)
  private Instant expiryDate;
}
