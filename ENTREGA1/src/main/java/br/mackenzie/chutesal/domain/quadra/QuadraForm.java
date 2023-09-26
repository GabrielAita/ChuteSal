package br.mackenzie.chutesal.domain.quadra;

import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.unidade.Unidade;
import br.mackenzie.chutesal.util.crud.Form;
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
public class QuadraForm implements Form<Quadra> {

    @NotBlank
    private String nome;
    @NotNull
    private Long unidadeId;
    private List<Long> jogosId;

    public Quadra convert(Unidade unidade, List<Jogo> jogos) {
        return new Quadra(this.nome, unidade, jogos);
    }

    @Override
    public Quadra convert() {
        return null;
    }
}
