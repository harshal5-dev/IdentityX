package com.identityx.api.appuser.service;

import java.util.UUID;
import org.springframework.lang.NonNull;
import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.appuser.web.dto.AppUserInfoResponse;
import com.identityx.api.appuser.web.dto.RegisterAppUser;
import com.identityx.api.appuser.web.dto.RegisterAppUserRes;

public interface IAppUserService {

  RegisterAppUserRes registerAppUser(RegisterAppUser registerAppUser);

  AppUser getAppUserByUsername(String username);

  AppUserInfoResponse getAppUserInfoByUserId(UUID userId);

  AppUser getAppUserByUserId(UUID userId);

  AppUser getAppUserById(@NonNull Long id);

}
