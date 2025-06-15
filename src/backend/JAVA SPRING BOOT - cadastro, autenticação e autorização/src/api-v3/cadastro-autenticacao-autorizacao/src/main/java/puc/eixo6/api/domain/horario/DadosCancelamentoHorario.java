package puc.eixo6.api.domain.horario;

import jakarta.validation.constraints.NotNull;

public record DadosCancelamentoHorario(
        @NotNull
        Long id
) {
}
