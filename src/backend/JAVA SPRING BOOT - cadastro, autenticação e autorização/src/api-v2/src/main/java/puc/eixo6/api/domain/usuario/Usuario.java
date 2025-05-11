package puc.eixo6.api.domain.usuario;


import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name="usuarios")
@Entity(name="Usuario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeExibicao;

    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    private byte[] fotoPerfil;
    private String usuario;
    private String senha;

    private Boolean deletado;

    public Usuario(DadosCadastroUsuario dados, byte[] fotoPerfil, String hashSenha) {
        this.nomeExibicao = dados.nomeExibicao();
        this.tipo = dados.tipo();
        this.fotoPerfil = fotoPerfil;
        this.usuario = dados.usuario();
        this.senha = hashSenha;
        this.deletado = false;
    }

    public boolean isDeletado() {
        return this.deletado;
    }


    public void atualizarInformacoes(@Valid DadosAtualizacaoUsuario dados, byte[] fotoPerfil) {

        if(dados.nomeExibicao() != null) {
            this.nomeExibicao = dados.nomeExibicao();
        }
        if(dados.tipo() != null) {
            this.tipo = dados.tipo();
        }
        if(fotoPerfil != null) {
            this.fotoPerfil = fotoPerfil;
        }
        if(dados.usuario() != null) {
            this.usuario = dados.usuario();
        }
    }

    public void deletar() {
        this.deletado = true;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.tipo.toString()));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return usuario;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
