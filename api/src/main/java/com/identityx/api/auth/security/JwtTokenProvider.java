package com.identityx.api.auth.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import com.identityx.api.auth.dto.AppUserDetails;
import com.identityx.api.auth.dto.ValidateJWTTokenResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenProvider implements IJwtTokenProvider {

  @Value("${jwt.secret.key}")
  private String jwtSecretKey;

  @Value("${jwt.expiration.ms}")
  private Long jwtExpirationMs;

  @Override
  public String generateJwtToken(AppUserDetails appUserDetails) {

    SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));

    return Jwts.builder().issuer("IdentityX").subject(appUserDetails.getUserId().toString())
        .claim("username", appUserDetails.getUsername())
        .claim("authorities",
            appUserDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()))
        .issuedAt(new Date()).expiration(new Date(new Date().getTime() + jwtExpirationMs))
        .signWith(secretKey).compact();
  }

  @Override
  public ValidateJWTTokenResponse validateJwtToken(String accessToken) {
    ValidateJWTTokenResponse response = new ValidateJWTTokenResponse();
    try {
      if (accessToken == null || accessToken.trim().isEmpty()) {
        log.error("JWT token is null or empty");
        response.setValid(false);
      }

      SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));

      Claims claims =
          Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(accessToken).getPayload();

      if (claims.getSubject() == null || claims.getSubject().isEmpty()) {
        log.error("JWT token subject is missing");
        response.setValid(false);
        return response;
      }

      if (claims.get("username") == null) {
        log.error("JWT token username claim is missing");
        response.setValid(false);
        return response;
      }

      if (claims.getExpiration() != null && claims.getExpiration().before(new Date())) {
        log.error("JWT token is expired");
        response.setValid(false);
        return response;
      }

      if (!"IdentityX".equals(claims.getIssuer())) {
        log.error("JWT token has invalid issuer: {}", claims.getIssuer());
        response.setValid(false);
        return response;
      }

      if (claims.get("authorities") == null) {
        log.error("JWT token authorities claim is missing");
        response.setValid(false);
        return response;
      }

      log.debug("JWT token validated successfully for user: {}", claims.get("username"));
      response.setValid(true);
      response.setUsername(claims.get("username", String.class));

    } catch (SignatureException e) {
      log.error("Invalid JWT signature: {}", e.getMessage());
      response.setValid(false);
    } catch (MalformedJwtException e) {
      log.error("Invalid JWT token format: {}", e.getMessage());
      response.setValid(false);
    } catch (ExpiredJwtException e) {
      log.error("JWT token is expired: {}", e.getMessage());
      response.setValid(false);
    } catch (UnsupportedJwtException e) {
      log.error("JWT token is unsupported: {}", e.getMessage());
      response.setValid(false);
    } catch (IllegalArgumentException e) {
      log.error("JWT claims string is empty or invalid: {}", e.getMessage());
      response.setValid(false);
    } catch (Exception e) {
      log.error("Unexpected error during JWT validation: {}", e.getMessage(), e);
      response.setValid(false);
    }

    return response;
  }

}
