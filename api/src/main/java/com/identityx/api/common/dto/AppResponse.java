package com.identityx.api.common.dto;

import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import lombok.Getter;

@Getter
public class AppResponse<T> {

  private final HttpStatus status;

  private final T data;

  private final LocalDateTime timestamp;

  private final String statusMessage;

  public AppResponse(HttpStatus status, T data, String statusMessage) {
    this.status = status;
    this.data = data;
    this.statusMessage = statusMessage;
    this.timestamp = LocalDateTime.now();
  }
}
