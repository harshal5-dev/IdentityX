package com.identityx.api.appuser.service;

import com.identityx.api.appuser.mapper.AppUserMapper;
import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.appuser.repo.AppUserRepository;
import com.identityx.api.appuser.web.dto.RegisterAppUser;
import com.identityx.api.appuser.web.dto.RegisterAppUserRes;
import com.identityx.api.common.exception.UserAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppUserService implements IAppUserService {

  private final AppUserRepository appUserRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public RegisterAppUserRes registerAppUser(RegisterAppUser registerAppUser) {

    Optional<AppUser> appUserOptional = appUserRepository.findByUsername(registerAppUser.getUsername());

    if (appUserOptional.isPresent()) {

      if (appUserOptional.get().getEmail().equals(registerAppUser.getEmail())) {
        throw new UserAlreadyExistsException("User with email " + registerAppUser.getEmail() + " already exists");
      }

      throw new UserAlreadyExistsException("User with username " + registerAppUser.getUsername() + " already exists");
    }

    AppUser appUser = AppUserMapper.mapToAppUser(registerAppUser);
    String encodedPassword = passwordEncoder.encode(registerAppUser.getPassword());
    appUser.setPassword(encodedPassword);
    AppUser savedAppUser = appUserRepository.save(appUser);
    return AppUserMapper.mapToRegisterAppUser(savedAppUser);

  }
}
