package puc.eixo6.api.domain.horario;

public record DadosListagemHorario(
        Long id,
        String data,
        String horarioInicial
) {
    public DadosListagemHorario(Horario horario) {
        this(
                horario.getId(),
                horario.getData(),
                horario.getHorarioInicial()
                );
    }
}
