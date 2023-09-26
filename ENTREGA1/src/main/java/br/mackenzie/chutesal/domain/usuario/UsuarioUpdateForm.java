package br.mackenzie.chutesal.domain.usuario;

import br.mackenzie.chutesal.util.crud.UpdateForm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioUpdateForm implements UpdateForm<Usuario> {

    private String username;
    private String password;

    @Override
    public Usuario update(Usuario entity) {
        entity.setUsername(this.username);
        entity.setPassword(this.password);

        return entity;
    }
}
