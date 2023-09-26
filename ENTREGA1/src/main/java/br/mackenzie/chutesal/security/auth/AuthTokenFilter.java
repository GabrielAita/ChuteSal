package br.mackenzie.chutesal.security.auth;

import br.mackenzie.chutesal.domain.usuario.Usuario;
import br.mackenzie.chutesal.domain.usuario.UsuarioRepo;
import br.mackenzie.chutesal.security.token.TokenService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class AuthTokenFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UsuarioRepo usuarioRepo;

    public AuthTokenFilter(TokenService tokenService, UsuarioRepo usuarioRepo) {
        this.tokenService = tokenService;
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getToken(request);
        Boolean valid = tokenService.isTokenValid(token);
        if(valid) {
            authClient(token);
        }
        filterChain.doFilter(request, response);
    }

    private void authClient(String token) {
        Long idUsuario = tokenService.getId(token);
        Optional<Usuario> usuario = usuarioRepo.findById(idUsuario);

        if(usuario.isPresent()) {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(usuario.get(), null, usuario.get().getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
    }

    private String getToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if(token == null || !token.startsWith("Bearer ")) {
            return null;
        }
        return token.substring(7);
    }
}
