package puc.eixo6.api.infra.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {


    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String uri = request.getRequestURI();

        if (uri.equals("/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (uri.equals("/validar")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (uri.equals("/usuarios/cadastro")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (uri.matches("/usuarios/\\d+")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (uri.matches("/usuarios/\\d+/fotoPerfil")) {
            filterChain.doFilter(request, response);
            return;
        }
        if (uri.matches("/horarios/prestador/\\d+/\\d{4}-\\d{2}-\\d{2}")) {
            filterChain.doFilter(request, response);
            return;
        }
        if (uri.matches("/horarios/prestador/disponivel/\\d+/\\d{4}-\\d{2}-\\d{2}")) {
            filterChain.doFilter(request, response);
            return;
        }
        if (uri.equals("/agendar")) {
            filterChain.doFilter(request, response);
            return;
        }

        String tokenJWT = recuperarToken(request);

        var subject = tokenService.getSubject(tokenJWT);



        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request) {
        var authorizationHeader = request.getHeader("Authorization");
        if(authorizationHeader == null) {
            throw new RuntimeException("Token JWT não enviado no cabeçalho 'Authorization'.");
        }
        return authorizationHeader.replace("Bearer", "").trim();
    }
}
