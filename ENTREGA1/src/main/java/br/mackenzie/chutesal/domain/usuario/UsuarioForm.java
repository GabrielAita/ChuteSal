package br.mackenzie.chutesal.domain.usuario;

import br.mackenzie.chutesal.util.crud.Form;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioForm implements Form<Usuario> {

    private String username;
    private String password;

    @Override
    public Usuario convert() {
        return new Usuario(this.username, this.password);
    }
}
