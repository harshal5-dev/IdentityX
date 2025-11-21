package com.identityx.api.auth.security;

import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.appuser.service.IAppUserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtUtils implements IJwtUtils {

  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${jwt.secret.key}")
  private String jwtSecretKey;

  @Value("${jwt.expiration.ms}")
  private Long jwtExpirationMs;

  private final IAppUserService appUserService;

  @Override
  public String generateJwtToken(Authentication authentication) {

    AppUser appUser = appUserService.getAppUserByUsername(authentication.getName());
    SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));

    return Jwts.builder().issuer("IdentityX").subject(appUser.getUserId().toString())
            .claim("username", appUser.getUsername())
            .claim("authorities",
                    authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                            .collect(Collectors.toList()))
            .issuedAt(new Date()).expiration(new Date(new Date().getTime() + jwtExpirationMs))
            .signWith(secretKey).compact();
  }

  @Override
  public boolean validateJwtToken(String accessToken) {
    try {
      // Validate token is not null or empty
      if (accessToken == null || accessToken.trim().isEmpty()) {
        logger.error("JWT token is null or empty");
        return false;
      }

      SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));

      // Parse and validate the token
      Claims claims = Jwts.parser()
              .verifyWith(secretKey)
              .build()
              .parseSignedClaims(accessToken)
              .getPayload();

      // Additional validation: check if token has required claims
      if (claims.getSubject() == null || claims.getSubject().isEmpty()) {
        logger.error("JWT token subject is missing");
        return false;
      }

      if (claims.get("username") == null) {
        logger.error("JWT token username claim is missing");
        return false;
      }

      // Check if token is expired (already done by parser, but explicit check)
      if (claims.getExpiration() != null && claims.getExpiration().before(new Date())) {
        logger.error("JWT token is expired");
        return false;
      }

      // Validate issuer
      if (!"IdentityX".equals(claims.getIssuer())) {
        logger.error("JWT token has invalid issuer: {}", claims.getIssuer());
        return false;
      }

      logger.debug("JWT token validated successfully for user: {}", claims.get("username"));
      return true;

    } catch (SignatureException e) {
      logger.error("Invalid JWT signature: {}", e.getMessage());
      return false;
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token format: {}", e.getMessage());
      return false;
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
      return false;
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
      return false;
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty or invalid: {}", e.getMessage());
      return false;
    } catch (Exception e) {
      logger.error("Unexpected error during JWT validation: {}", e.getMessage(), e);
      return false;
    }
  }

  /**
   * Extract username from JWT token
   */
  @Override
  public String getUsernameFromJwtToken(String token) {
    try {
      SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
      Claims claims = Jwts.parser()
              .verifyWith(secretKey)
              .build()
              .parseSignedClaims(token)
              .getPayload();
      return claims.get("username", String.class);
    } catch (Exception e) {
      logger.error("Error extracting username from JWT token: {}", e.getMessage());
      return null;
    }
  }

  /**
   * Extract user ID from JWT token
   */
  @Override
  public Long getUserIdFromJwtToken(String token) {
    try {
      SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
      Claims claims = Jwts.parser()
              .verifyWith(secretKey)
              .build()
              .parseSignedClaims(token)
              .getPayload();
      return Long.parseLong(claims.getSubject());
    } catch (Exception e) {
      logger.error("Error extracting user ID from JWT token: {}", e.getMessage());
      return null;
    }
  }

  /**
   * Get token expiration date
   */
  @Override
  public Date getExpirationDateFromJwtToken(String token) {
    try {
      SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
      Claims claims = Jwts.parser()
              .verifyWith(secretKey)
              .build()
              .parseSignedClaims(token)
              .getPayload();
      return claims.getExpiration();
    } catch (Exception e) {
      logger.error("Error extracting expiration date from JWT token: {}", e.getMessage());
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  @Override
  public boolean isTokenExpired(String token) {
    try {
      Date expiration = getExpirationDateFromJwtToken(token);
      return expiration != null && expiration.before(new Date());
    } catch (Exception e) {
      logger.error("Error checking token expiration: {}", e.getMessage());
      return true;
    }
  }

}
