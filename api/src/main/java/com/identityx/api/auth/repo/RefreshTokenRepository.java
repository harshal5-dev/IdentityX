package com.identityx.api.auth.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import com.identityx.api.appuser.model.AppUser;
import com.identityx.api.auth.model.RefreshToken;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByToken(String token);

  @Modifying
  void deleteByAppUser(AppUser appUser);

  @Modifying
  void deleteByAppUser_id(Long appUserId);

}
