package com.identityx.api.appuser.web;


import com.identityx.api.appuser.service.IAppUserService;
import com.identityx.api.appuser.web.dto.RegisterAppUser;
import com.identityx.api.appuser.web.dto.RegisterAppUserRes;
import com.identityx.api.common.dto.AppResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Validated
public class AppUserController {

  private final IAppUserService appUserService;

  @PostMapping("/register")
  public ResponseEntity<AppResponse<RegisterAppUserRes>> registerUser(@Valid @RequestBody RegisterAppUser registerAppUser) {
    RegisterAppUserRes registerAppUserRes = appUserService.registerAppUser(registerAppUser);
    AppResponse<RegisterAppUserRes> response = new AppResponse<>(HttpStatus.OK,
        registerAppUserRes, "User registered successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
