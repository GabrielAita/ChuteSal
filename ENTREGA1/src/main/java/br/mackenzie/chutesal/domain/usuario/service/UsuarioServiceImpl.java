package br.mackenzie.chutesal.domain.usuario.service;

import br.mackenzie.chutesal.domain.usuario.Usuario;
import br.mackenzie.chutesal.domain.usuario.UsuarioRepo;
import br.mackenzie.chutesal.util.crud.Form;
import br.mackenzie.chutesal.util.crud.UpdateForm;
import br.mackenzie.chutesal.util.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepo usuarioRepo;

    @Autowired
    public UsuarioServiceImpl(UsuarioRepo usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    public List<Usuario> findAll() {
        return usuarioRepo.findAll();
    }

    @Override
    public Usuario findById(Long id) {
        Optional<Usuario> usuario = usuarioRepo.findById(id);
        if(usuario.isPresent()) {
            return usuario.get();
        } else {
            throw new NotFoundException("Usuário " + id + " não encontrado!");
        }
    }

    @Override
    public Usuario findByUsername(String username) {
        Optional<Usuario> usuario = usuarioRepo.findByUsername(username);
        if(usuario.isPresent()) {
            return usuario.get();
        } else {
            throw new NotFoundException("Usuário " + username + " não encontrado!");
        }
    }

    @Override
    public Usuario create(Form<Usuario> form) {
        Usuario usuario = form.convert();
        return usuarioRepo.save(usuario);
    }

    @Override
    public Usuario update(Long id, UpdateForm<Usuario> updateForm) {
        Optional<Usuario> usuario = usuarioRepo.findById(id);
        if(usuario.isPresent()) {
            return updateForm.update(usuario.get());
        } else {
            throw new NotFoundException("Usuário " + id + " não encontrado!");
        }
    }

    @Override
    public void delete(Long id) {
        Optional<Usuario> usuario = usuarioRepo.findById(id);
        if(usuario.isPresent()) {
            usuarioRepo.delete(usuario.get());
        } else {
            throw new NotFoundException("Usuário " + id + " não encontrado!");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> usuario = usuarioRepo.findByUsername(username);
        if(usuario.isPresent()) {
            return usuario.get();
        }
        throw new UsernameNotFoundException("Usuário ou senha inválidos!");
    }
}
