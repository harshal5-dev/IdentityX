package com.identityx.api.auth.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.appuser.service.IAppUserService;
import com.identityx.api.auth.web.dto.AppUserDetails;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

  private final IAppUserService appUserService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    AppUser appUser = appUserService.getAppUserByUsername(username);
    return new AppUserDetails(appUser);
  }
}
