package com.identityx.api.address.model;

import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "address")
@Getter
@Setter
public class Address extends BaseEntity {

  private AddressType type;

  @Column(name = "street", length = 500)
  private String street;

  @Column(name = "city", length = 100)
  private String city;

  @Column(name = "state", length = 100)
  private String state;

  @Column(name = "postal_code", length = 20)
  private String postalCode;

  @Column(name = "country", length = 100)
  private String country;

  @Column(name = "phone_number", length = 20)
  private String phoneNumber;

  @Column(name = "is_primary")
  private Boolean isPrimary = false;

  @ManyToOne
  @JoinColumn(name = "app_user_id", referencedColumnName = "id")
  private AppUser appUser;
}
