package puc.eixo6.api.domain.horario;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosAtualizacaoHorario(

        @NotNull
        Long id,

        @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}")
        String data,

        Long idPrestador,

        Long idCliente,

        @Pattern(regexp = "\\d{2}:\\d{2}")
        String horarioInicial,

        Integer deletado

) {
}
