package com.identityx.api.appuser.mapper;

import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.appuser.web.dto.RegisterAppUser;
import com.identityx.api.appuser.web.dto.RegisterAppUserRes;

public final class AppUserMapper {

  public static AppUser mapToAppUser(RegisterAppUser registerAppUser) {
   AppUser appUser = new AppUser();
    appUser.setUsername(registerAppUser.getUsername());
    appUser.setPassword(registerAppUser.getPassword());
    appUser.setEmail(registerAppUser.getEmail());
    appUser.setFirstName(registerAppUser.getFirstName());
    appUser.setLastName(registerAppUser.getLastName());
    return appUser;
  }

  public static RegisterAppUserRes mapToRegisterAppUser(AppUser appUser) {
    RegisterAppUserRes res = new RegisterAppUserRes();
    res.setUsername(appUser.getUsername());
    res.setEmail(appUser.getEmail());
    res.setFirstName(appUser.getFirstName());
    res.setLastName(appUser.getLastName());
    return res;
  }

}
