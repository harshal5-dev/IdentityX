package com.identityx.api.auth.filter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;
import com.identityx.api.auth.constants.AuthConstants;
import com.identityx.api.auth.dto.ValidateJWTTokenResponse;
import com.identityx.api.auth.security.IJwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JWTTokenValidatorFilter extends OncePerRequestFilter {

  private static final Set<String> EXCLUDED_PATHS =
      Set.of("/api/auth/login", "/api/user/register", "/api/auth/refresh-token");

  private final IJwtTokenProvider jwtTokenProvider;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
      throws ServletException, IOException {

    String accessToken = extractJwtFromCookies(request);
    if (accessToken != null && !accessToken.isBlank()) {
      ValidateJWTTokenResponse validationResponse = jwtTokenProvider.validateJwtToken(accessToken);
      if (validationResponse.isValid()) {
        String username = validationResponse.getUsername();
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
            userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);
      } else {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        String message = "Invalid or expired token";
        String path = request.getRequestURI();
        String jsonResponse = String.format(
            "{\"apiPath\": \"%s\", \"errorCode\": \"%s\", \"errorMessage\": \"%s\", \"errorTime\": \"%s\"}",
            path, HttpStatus.UNAUTHORIZED, message, LocalDateTime.now());
        response.getWriter().write(jsonResponse);
        return;
      }
    }

    filterChain.doFilter(request, response);
  }

  private String extractJwtFromCookies(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies == null) {
      return null;
    }
    for (Cookie cookie : cookies) {
      if (AuthConstants.AUTHORIZATION_COOKIE.equals(cookie.getName())) {
        return cookie.getValue();
      }
    }
    return null;
  }

  @Override
  protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
    return EXCLUDED_PATHS.contains(request.getServletPath());
  }

}
