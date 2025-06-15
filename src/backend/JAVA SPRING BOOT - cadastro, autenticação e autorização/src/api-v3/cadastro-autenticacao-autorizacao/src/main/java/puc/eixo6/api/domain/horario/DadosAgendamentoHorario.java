package puc.eixo6.api.domain.horario;

import jakarta.validation.constraints.NotNull;

public record DadosAgendamentoHorario(
        @NotNull
        Long idHorario,

        @NotNull
        Long idCliente
) {
}
