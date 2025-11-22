package com.identityx.api.appuser.service;

import java.util.UUID;
import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.appuser.web.dto.AppUserInfoResponse;
import com.identityx.api.appuser.web.dto.RegisterAppUser;
import com.identityx.api.appuser.web.dto.RegisterAppUserRes;

public interface IAppUserService {

  RegisterAppUserRes registerAppUser(RegisterAppUser registerAppUser);

  AppUser getAppUserByUsername(String username);

  AppUserInfoResponse getAppUserInfoByUserId(UUID userId);

}
