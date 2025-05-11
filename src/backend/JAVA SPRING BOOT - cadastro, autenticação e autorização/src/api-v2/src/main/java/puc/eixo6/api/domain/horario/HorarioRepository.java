package puc.eixo6.api.domain.horario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface HorarioRepository extends JpaRepository<Horario, Long> {
    Page<Horario> findAllByDeletadoFalse(Pageable paginacao);
    Page<Horario> findAllByDeletadoFalseAndIdPrestador(Long idPrestador, Pageable paginacao);
    Page<Horario> findAllByDeletadoFalseAndIdPrestadorAndData(Long idPrestador, String data, Pageable paginacao);
    Page<Horario> findAllByDeletadoFalseAndIdPrestadorAndDataAndIdClienteNull(Long idPrestador, String data, Pageable paginacao);
    Page<Horario> findAllByDeletadoFalseAndIdPrestadorAndDataAndIdClienteIsNotNull(Long idPrestador, String data, Pageable paginacao);
    Page<Horario> findAllByDeletadoFalseAndIdCliente(Long idCliente, Pageable paginacao);
    Page<Horario> findAllByDeletadoFalseAndIdClienteAndData(Long idCliente, String data, Pageable paginacao);

    @Query("SELECT h FROM Horario h WHERE h.deletado = false AND h.idCliente = :idCliente AND FUNCTION('STR_TO_DATE', h.data, '%Y-%m-%d') >= CURRENT_DATE")
    Page<Horario> findAllByDeletadoFalseAndIdClienteAndDataGreaterThanEqual(Long idCliente, LocalDate data, Pageable paginacao);
}