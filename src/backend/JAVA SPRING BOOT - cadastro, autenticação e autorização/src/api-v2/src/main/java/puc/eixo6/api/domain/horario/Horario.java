package puc.eixo6.api.domain.horario;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name="horarios")
@Entity(name="Horario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Horario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String data;
    private Long idPrestador;
    private Long idCliente;
    private String horarioInicial;
    private Boolean deletado;

    public Horario(DadosCadastroHorario dados) {
        this.data = dados.data();
        this.idPrestador = dados.idPrestador();
        this.idCliente = dados.idCliente();
        this.horarioInicial = dados.horarioInicial();
        this.deletado = false;
    }

    public void atualizarInformacoes(@Valid DadosAtualizacaoHorario dados) {
        if(dados.data() != null) {
            this.data = dados.data();
        }

        if(dados.horarioInicial() != null) {
            this.horarioInicial = dados.horarioInicial();
        }
    }

    public void agendarHorario(@Valid DadosAgendamentoHorario dados) {
        if(dados.idCliente() != null) {
            this.idCliente = dados.idCliente();
        }
    }

    public void cancelarAgendamento(@Valid DadosCancelamentoHorario dados) {
        this.idCliente = null;
    }

    public void deletar() {
        this.deletado = true;
    }

    public boolean isDeletado() {
        return this.deletado;
    }
}
