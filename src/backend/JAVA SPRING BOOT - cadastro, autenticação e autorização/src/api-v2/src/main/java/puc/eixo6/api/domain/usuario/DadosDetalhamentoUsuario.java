package puc.eixo6.api.domain.usuario;

public record DadosDetalhamentoUsuario(
        Long id,
        String nomeExibicao,
        Tipo tipo) {

    public DadosDetalhamentoUsuario(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNomeExibicao(),
                usuario.getTipo());
    }
}
