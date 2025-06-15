package puc.eixo6.api.domain.usuario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByUsuario(String usuario);
    Page<Usuario> findAllByDeletadoFalse(Pageable paginacao);
    @Query("SELECT u FROM Usuario u WHERE u.deletado = false AND LOWER(u.tipo) = LOWER(:tipo)")
    Page<Usuario> findAllByTipo(@Param("tipo") String Tipo, Pageable paginacao);
}
