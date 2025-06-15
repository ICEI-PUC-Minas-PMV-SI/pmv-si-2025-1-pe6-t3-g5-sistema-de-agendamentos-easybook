package puc.eixo6.api.domain.usuario;

public record DadosListagemUsuario(
        Long id,
        String nomeExibicao) {

    public DadosListagemUsuario(Usuario usuario) {
        this(usuario.getId(), usuario.getNomeExibicao());
    }
}
