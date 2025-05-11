package puc.eixo6.api.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;
import puc.eixo6.api.domain.usuario.*;
import puc.eixo6.api.infra.security.DadosTokenJWT;
import puc.eixo6.api.infra.security.TokenService;

import java.io.IOException;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @SecurityRequirement(name = "bearer-key")
    @GetMapping
    public Page<DadosListagemUsuario> listar(Pageable paginacao) {
        return repository.findAllByDeletadoFalse(paginacao).map(DadosListagemUsuario::new);
    }

    @SecurityRequirement(name = "bearer-key")
    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoUsuario> getUsuario(@PathVariable Long id) {
        var usuario = repository.getReferenceById(id);

        if(usuario.isDeletado()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(new DadosDetalhamentoUsuario(usuario));
    }

    @SecurityRequirement(name = "bearer-key")
    @GetMapping("/{id}/fotoPerfil")
    public ResponseEntity<byte[]> baixarFotoPerfil(@PathVariable Long id) {
        var usuario = repository.findById(id);
        if (usuario.isEmpty() || usuario.get().getFotoPerfil() == null) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("image/webp"));
        headers.setContentLength(usuario.get().getFotoPerfil().length);

        return new ResponseEntity<>(usuario.get().getFotoPerfil(), headers, HttpStatus.OK);
    }


    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager manager;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<DadosTokenJWT> cadastrar(@RequestBody @Valid DadosCadastroUsuario dados,
                                                   UriComponentsBuilder uriBuilder) throws IOException {

        String hashSenha = passwordEncoder.encode(dados.senha());

        var usuario = new Usuario(dados, null, hashSenha);


        repository.save(usuario);

        var token = new UsernamePasswordAuthenticationToken(dados.usuario(), dados.senha());
        var authentication = manager.authenticate(token);

        var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());
        return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
    }

    @SecurityRequirement(name = "bearer-key")
    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoUsuario> atualizar(@RequestPart("dados") @Valid DadosAtualizacaoUsuario dados,
                                                              @RequestPart(value = "fotoPerfil", required = false) MultipartFile fotoPerfil) throws IOException {

        Long idToken = tokenService.getTokenId();
        Long idRequisicao = dados.id();

        byte[] bytesFoto = (fotoPerfil != null && !fotoPerfil.isEmpty()) ?
                fotoPerfil.getBytes()
                : null;

        if(!idRequisicao.equals(idToken)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).<DadosDetalhamentoUsuario>build();
        }

        var usuario = repository.getReferenceById(idRequisicao);
        usuario.atualizarInformacoes(dados, bytesFoto);
        return ResponseEntity.ok(new DadosDetalhamentoUsuario(usuario));
    }

    @SecurityRequirement(name = "bearer-key")
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        Long idToken = tokenService.getTokenId();
        if(!id.equals(idToken)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        var usuario = repository.getReferenceById(id);
        usuario.deletar();
        return ResponseEntity.noContent().build();
    }
}
