package puc.eixo6.api.domain.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroUsuario(

        @NotBlank
        String nomeExibicao,

        @NotNull
        Tipo tipo,

        byte[] fotoPerfil,

        @NotNull
        String usuario,

        @NotNull
        String senha) {

}
