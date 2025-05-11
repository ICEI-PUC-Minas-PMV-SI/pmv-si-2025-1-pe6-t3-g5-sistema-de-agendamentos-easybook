package puc.eixo6.api.domain.usuario;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoUsuario(
        @NotNull
        Long id,

        String nomeExibicao,
        Tipo tipo,
        byte[] fotoPerfil,
        String usuario
) {
}
