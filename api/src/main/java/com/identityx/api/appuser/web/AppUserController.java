package com.identityx.api.appuser.web;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.identityx.api.appuser.service.IAppUserService;
import com.identityx.api.appuser.web.dto.AppUserInfoResponse;
import com.identityx.api.appuser.web.dto.RegisterAppUser;
import com.identityx.api.appuser.web.dto.RegisterAppUserRes;
import com.identityx.api.auth.dto.AppUserDetails;
import com.identityx.api.common.dto.AppResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@Validated
public class AppUserController {

  private final IAppUserService appUserService;

  @GetMapping("/me")
  public ResponseEntity<AppResponse<AppUserInfoResponse>> getMethodName(
      Authentication authentication) {
    AppUserDetails appUserDetails = (AppUserDetails) authentication.getPrincipal();

    AppUserInfoResponse appUserInfoResponse =
        appUserService.getAppUserInfoByUserId(appUserDetails.getUserId());

    AppResponse<AppUserInfoResponse> response =
        new AppResponse<>(HttpStatus.OK, appUserInfoResponse, "User info fetched successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }


  @PostMapping("/register")
  public ResponseEntity<AppResponse<RegisterAppUserRes>> registerUser(
      @Valid @RequestBody RegisterAppUser registerAppUser) {
    RegisterAppUserRes registerAppUserRes = appUserService.registerAppUser(registerAppUser);
    AppResponse<RegisterAppUserRes> response =
        new AppResponse<>(HttpStatus.OK, registerAppUserRes, "User registered successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
