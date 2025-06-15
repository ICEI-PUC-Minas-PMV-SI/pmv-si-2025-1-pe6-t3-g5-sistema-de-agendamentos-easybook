package puc.eixo6.api.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import puc.eixo6.api.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collections;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;


    public String gerarToken(Usuario usuario) {

        try {
            var algoritmo = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("API eixo 6")
                    .withSubject(usuario.getUsuario())
                    .withExpiresAt(dataExpiracao())
                    .withClaim("id", usuario.getId())
                    .sign(algoritmo);
        } catch (JWTCreationException exception){
            throw new RuntimeException("erro ao gerar token jwt", exception);
        }
    }

    public String getSubject(String tokenJWT) {
        try {
            var algoritmo = Algorithm.HMAC256(secret);
            DecodedJWT decodedJWT;
            JWTVerifier verifier = JWT.require(algoritmo)
                    .withIssuer("API eixo 6")
                    .build();

            decodedJWT = verifier.verify(tokenJWT);

            // Cria uma autenticação baseada no JWT
            var authentication = new UsernamePasswordAuthenticationToken(
                    decodedJWT, // principal (pode ser qualquer objeto)
                    null, // credentials
                    Collections.emptyList() // authorities
            );

            // Registra no contexto de segurança
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return decodedJWT.getSubject();
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Token JWT inválido ou expirado!");
        }
    }

    public Long getTokenId() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        //System.out.println(auth.getPrincipal());
        if (auth.getPrincipal() instanceof DecodedJWT jwt) {
            //System.out.println(jwt.getClaim("id").asLong());
            return jwt.getClaim("id").asLong();
        }
        throw new RuntimeException("Token inválido ou usuário não autenticado");
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusWeeks(10).toInstant(ZoneOffset.of("-03:00"));
    }

}
