package puc.eixo6.api.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import puc.eixo6.api.domain.horario.*;
import puc.eixo6.api.infra.security.TokenService;

import java.time.LocalDate;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/horarios")

public class HorarioController {

    @Autowired
    private HorarioRepository repository;

    @Autowired
    private TokenService tokenService;

    @SecurityRequirement(name = "bearer-key")
    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoHorario> cadastrar(@RequestBody @Valid DadosCadastroHorario dados, UriComponentsBuilder uriBuilder) {

        var horario = new Horario(dados);
        repository.save(horario);

        var uri = uriBuilder.path("/horarios/{id}").buildAndExpand(horario.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosDetalhamentoHorario(horario));
    }

    @SecurityRequirement(name = "bearer-key")
    @GetMapping
    public ResponseEntity<Page<DadosListagemHorario>> listar(@PageableDefault(sort = {"data", "horarioInicial"}) Pageable paginacao) {


        Page<DadosListagemHorario> page =  repository.findAllByDeletadoFalse(paginacao).map(DadosListagemHorario::new);

        return ResponseEntity.ok(page);
    }

    @SecurityRequirement(name = "bearer-key")
    @GetMapping("/prestador/{id}/{data}")
    public ResponseEntity<Page<DadosListagemHorario>> listarPorPrestadorEData(@PageableDefault(sort = {"data", "horarioInicial"}, size = 50) Pageable paginacao,
                                                                              @PathVariable Long id,
                                                                              @PathVariable String data) {

        Page<DadosListagemHorario> page = repository.findAllByDeletadoFalseAndIdPrestadorAndData(id, data, paginacao).map(DadosListagemHorario::new);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/prestador/disponivel/{id}/{data}")
    public ResponseEntity<Page<DadosListagemHorario>> listarPorPrestadorEDataDisponivel(@PageableDefault(sort = {"data", "horarioInicial"}, size = 50) Pageable paginacao,
                                                                                        @PathVariable Long id,
                                                                                        @PathVariable String data) {

        Page<DadosListagemHorario> page = repository.findAllByDeletadoFalseAndIdPrestadorAndDataAndIdClienteNull(id, data, paginacao).map(DadosListagemHorario::new);
        return ResponseEntity.ok(page);
    }

    @SecurityRequirement(name = "bearer-key")
    @GetMapping("/prestador/agendado/{id}/{data}")
    public ResponseEntity<Page<DadosListagemHorario>> listarPorPrestadorEDataAgendada(@PageableDefault(sort = {"data", "horarioInicial"}, size = 50) Pageable paginacao,
                                                                                        @PathVariable Long id,
                                                                                        @PathVariable String data) {

        Page<DadosListagemHorario> page = repository.findAllByDeletadoFalseAndIdPrestadorAndDataAndIdClienteIsNotNull(id, data, paginacao).map(DadosListagemHorario::new);
        return ResponseEntity.ok(page);
    }

    @SecurityRequirement(name = "bearer-key")
    @GetMapping("/proximos/cliente/{id}")
    public ResponseEntity<Page<DadosListagemHorarioCliente>> listarAgendamentosFuturosPorCliente(@PageableDefault(sort = {"data", "horarioInicial"}, size = 30) Pageable paginacao,
                                                                            @PathVariable Long id) {

        LocalDate dataAtual = LocalDate.now();

        Page<DadosListagemHorarioCliente> page = repository.findAllByDeletadoFalseAndIdClienteAndDataGreaterThanEqual(id, dataAtual, paginacao).map(DadosListagemHorarioCliente::new);
        return ResponseEntity.ok(page);
    }

    @SecurityRequirement(name = "bearer-key")
    @GetMapping("/cliente/{id}/{data}")
    public ResponseEntity<Page<DadosListagemHorario>> listarPorClienteEData(@PageableDefault(sort = {"data", "horarioInicial"}) Pageable paginacao,
                                                                            @PathVariable Long id,
                                                                            @PathVariable String data) {

        Page<DadosListagemHorario> page = repository.findAllByDeletadoFalseAndIdClienteAndData(id, data, paginacao).map(DadosListagemHorario::new);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoHorario> getUsuario(@PathVariable Long id) {
        var horario = repository.getReferenceById(id);
        System.out.println(horario.getIdPrestador());

        if(horario.isDeletado()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(new DadosDetalhamentoHorario(horario));
    }

    @SecurityRequirement(name = "bearer-key")
    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoHorario> atualizar(@RequestBody @Valid DadosAtualizacaoHorario dados) {

        Long idToken = tokenService.getTokenId();
        Long idPrestador = repository.getReferenceById(dados.id()).getIdPrestador();

        if(!idPrestador.equals(idToken)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).<DadosDetalhamentoHorario>build();
        }

        var horario = repository.getReferenceById(dados.id());
        horario.atualizarInformacoes(dados);
        return ResponseEntity.ok(new DadosDetalhamentoHorario(horario));
    }


    @SecurityRequirement(name = "bearer-key")
    @PutMapping("/agendar")
    @Transactional
    public ResponseEntity<DadosDetalhamentoHorario> agendar(@RequestBody @Valid DadosAgendamentoHorario dados) {

        Long idToken = tokenService.getTokenId();
        Long idUsuario = repository.getReferenceById(dados.idHorario()).getIdCliente();
        System.out.println("idUsuario: "+idUsuario);
        System.out.println("idToken: "+idToken);

        if(idUsuario != null || !dados.idCliente().equals(idToken)) {
            System.out.println("id usuário:");
            System.out.println(idUsuario);
            System.out.println("id token");
            System.out.println(idToken);
            System.out.println("dados.id");
            System.out.println(dados.idHorario());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).<DadosDetalhamentoHorario>build();
        }

        var horario = repository.getReferenceById(dados.idHorario());
        horario.agendarHorario(dados);
        return ResponseEntity.ok(new DadosDetalhamentoHorario(horario));

    }

    @SecurityRequirement(name = "bearer-key")
    @PutMapping("/cancelar")
    @Transactional
    public ResponseEntity<DadosDetalhamentoHorario> cancelar(@RequestBody @Valid DadosCancelamentoHorario dados) {

        Long idToken = tokenService.getTokenId();
        Long idCliente = repository.getReferenceById(dados.id()).getIdCliente();
        Long idPrestador = repository.getReferenceById(dados.id()).getIdPrestador();

        if(idCliente == null || (!idCliente.equals(idToken) && !idPrestador.equals(idToken))
        ) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).<DadosDetalhamentoHorario>build();
        }

        var horario = repository.getReferenceById(dados.id());
        horario.cancelarAgendamento(dados);
        return ResponseEntity.ok(new DadosDetalhamentoHorario(horario));

    }
    /*MÉTODOS PARA AGENDAMENTO (FIM)*/

    @SecurityRequirement(name = "bearer-key")
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        var horario = repository.getReferenceById(id);
        horario.deletar();
        return ResponseEntity.noContent().build();
    }
}
