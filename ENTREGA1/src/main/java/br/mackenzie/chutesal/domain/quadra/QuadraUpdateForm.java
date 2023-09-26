package br.mackenzie.chutesal.domain.quadra;

import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.unidade.Unidade;
import br.mackenzie.chutesal.util.crud.UpdateForm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QuadraUpdateForm implements UpdateForm<Quadra> {

    @NotBlank
    private String nome;
    @NotNull
    private Long unidadeId;
    private List<Long> jogosId;

    public Quadra update(Quadra entity, Unidade unidade, List<Jogo> jogos) {
        entity.setNome(this.nome);
        entity.setUnidade(unidade);
        entity.setJogos(jogos);

        return entity;
    }

    @Override
    public Quadra update(Quadra entity) {
        return null;
    }
}
