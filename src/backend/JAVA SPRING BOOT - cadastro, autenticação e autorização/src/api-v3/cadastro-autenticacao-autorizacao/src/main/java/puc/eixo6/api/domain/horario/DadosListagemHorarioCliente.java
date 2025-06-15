package puc.eixo6.api.domain.horario;

public record DadosListagemHorarioCliente(
        Long id,
        String data,
        String horarioInicial,
        Long idPrestador
) {
    public DadosListagemHorarioCliente(Horario horario) {
        this(
                horario.getId(),
                horario.getData(),
                horario.getHorarioInicial(),
                horario.getIdPrestador()
                );
    }
}
