package br.mackenzie.chutesal.domain.unidade;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.quadra.Quadra;
import br.mackenzie.chutesal.util.crud.UpdateForm;
import br.mackenzie.chutesal.util.endereco.Endereco;
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
public class UnidadeUpdateForm implements UpdateForm<Unidade> {

    @NotBlank
    private String nome;
    @NotNull
    private Integer numero;
    @NotNull
    private Endereco endereco;
    private List<Long> quadrasId;
    private List<Long> campeonatosId;

    public Unidade update(Unidade entity, List<Quadra> quadras, List<Campeonato> campeonatos, Endereco endereco) {
        entity.setNome(this.nome);
        entity.setNumero(this.numero);
        entity.setEndereco(endereco);
        entity.setQuadras(quadras);
        entity.setCampeonatos(campeonatos);

        return entity;
    }

    @Override
    public Unidade update(Unidade entity) {
        return null;
    }
}
