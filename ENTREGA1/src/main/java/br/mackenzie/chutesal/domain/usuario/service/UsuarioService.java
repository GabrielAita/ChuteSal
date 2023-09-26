package br.mackenzie.chutesal.domain.usuario.service;

import br.mackenzie.chutesal.domain.usuario.Usuario;
import br.mackenzie.chutesal.util.crud.CrudService;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UsuarioService extends CrudService<Usuario>, UserDetailsService {

    Usuario findByUsername(String username);
}
