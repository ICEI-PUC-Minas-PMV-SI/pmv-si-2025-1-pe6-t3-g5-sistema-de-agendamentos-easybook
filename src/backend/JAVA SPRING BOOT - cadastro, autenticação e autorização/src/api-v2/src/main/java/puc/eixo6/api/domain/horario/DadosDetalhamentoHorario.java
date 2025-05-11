package puc.eixo6.api.domain.horario;

public record DadosDetalhamentoHorario(
        Long id,
        String data,
        String horarioInicial
) {

    public DadosDetalhamentoHorario(Horario horario) {
        this(
                horario.getId(),
                horario.getData(),
                horario.getHorarioInicial()
        );
    }
}
