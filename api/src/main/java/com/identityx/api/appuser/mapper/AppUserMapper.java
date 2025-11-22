package com.identityx.api.appuser.mapper;

import java.util.UUID;
import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.appuser.web.dto.AppUserInfoResponse;
import com.identityx.api.appuser.web.dto.RegisterAppUser;
import com.identityx.api.appuser.web.dto.RegisterAppUserRes;

public final class AppUserMapper {

  private AppUserMapper() {}

  public static AppUser mapToAppUser(RegisterAppUser registerAppUser) {
    AppUser appUser = new AppUser();

    appUser.setUserId(UUID.randomUUID());
    appUser.setUsername(registerAppUser.getUsername());
    appUser.setPassword(registerAppUser.getPassword());
    appUser.setEmail(registerAppUser.getEmail());
    appUser.setFirstName(registerAppUser.getFirstName());
    appUser.setLastName(registerAppUser.getLastName());
    return appUser;
  }

  public static RegisterAppUserRes mapToRegisterAppUser(AppUser appUser) {
    RegisterAppUserRes res = new RegisterAppUserRes();

    res.setUserId(appUser.getUserId());
    res.setUsername(appUser.getUsername());
    res.setEmail(appUser.getEmail());
    res.setFirstName(appUser.getFirstName());
    res.setLastName(appUser.getLastName());
    return res;
  }

  public static AppUserInfoResponse mapToAppUserInfoResponse(AppUser appUser) {
    AppUserInfoResponse response = new AppUserInfoResponse();

    response.setUserId(appUser.getUserId());
    response.setUsername(appUser.getUsername());
    response.setEmail(appUser.getEmail());
    response.setFirstName(appUser.getFirstName());
    response.setLastName(appUser.getLastName());
    response.setMiddleName(appUser.getMiddleName());
    return response;
  }

}
