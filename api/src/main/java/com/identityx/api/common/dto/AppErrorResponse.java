package com.identityx.api.common.dto;

import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.http.HttpStatus;
import lombok.Getter;

@Getter
public class AppErrorResponse {

  private final String apiPath;

  private final HttpStatus errorCode;

  private final String errorMessage;

  private final LocalDateTime errorTime;

  private Map<String, String> validationErrors;

  public AppErrorResponse(String apiPath, HttpStatus errorCode, String errorMessage) {
    this.apiPath = apiPath;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.errorTime = LocalDateTime.now();
  }

  public AppErrorResponse(String apiPath, HttpStatus errorCode, String errorMessage,
      Map<String, String> validationErrors) {
    this.apiPath = apiPath;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.errorTime = LocalDateTime.now();
    this.validationErrors = validationErrors;
  }
}
