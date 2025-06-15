package puc.eixo6.api.domain.usuario;

public record DadosListagemUsuarioPrestador(
        Long id,
        String nomeExibicao) {

    public DadosListagemUsuarioPrestador(Usuario usuario) {
        this(usuario.getId(), usuario.getNomeExibicao());
    }
}
