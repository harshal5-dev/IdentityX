package com.identityx.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ExampleController {

  @GetMapping("/example")
  public String getInfo() {
    return "Example Response";
  }

}
