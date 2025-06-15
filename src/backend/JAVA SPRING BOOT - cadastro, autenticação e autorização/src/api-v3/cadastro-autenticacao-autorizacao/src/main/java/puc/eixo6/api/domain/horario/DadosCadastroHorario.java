package puc.eixo6.api.domain.horario;

import jakarta.validation.constraints.*;

public record DadosCadastroHorario(
        @NotBlank
        @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}") //AAAA-MM-DD
        String data,


        @NotNull
        Long idPrestador,


        @NotBlank
        @Pattern(regexp = "\\d{2}:\\d{2}") //HH:MM
        String horarioInicial,

        Long idCliente


) {
}
