package com.identityx.api.appuser.service;

import com.identityx.api.appuser.web.dto.RegisterAppUser;
import com.identityx.api.appuser.web.dto.RegisterAppUserRes;

public interface IAppUserService {

  RegisterAppUserRes registerAppUser(RegisterAppUser registerAppUser);

}
