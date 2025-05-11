package puc.eixo6.api.domain.usuario;

public record DadosListagemUsuario(
        Long id,
        String nomeExibicao,
        byte[] fotoPerfil) {

    public DadosListagemUsuario(Usuario usuario) {
        this(usuario.getId(), usuario.getNomeExibicao(), usuario.getFotoPerfil());
    }
}
