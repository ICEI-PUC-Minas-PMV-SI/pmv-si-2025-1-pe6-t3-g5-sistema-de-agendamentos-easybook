package com.puc.easybookautenticateuser.repository;

import com.puc.easybookautenticateuser.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Integer>  {
    boolean existsByUsuario(String usuario);
    UserDetails findByUsuario(String usuario);
}
