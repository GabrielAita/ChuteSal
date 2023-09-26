package br.mackenzie.chutesal.domain.time;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.inscrito.Inscrito;
import br.mackenzie.chutesal.domain.jogo.Jogo;
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
public class TimeUpdateForm implements UpdateForm<Time> {

    @NotBlank
    private String nome;
    @NotNull
    private Long campeonatoId;
    private List<Long> inscritosId;
    private List<Long> jogosId;

    public Time update(Time entity, Campeonato campeonato, List<Inscrito> inscritos, List<Jogo> jogos) {
        entity.setNome(this.nome);
        entity.setCampeonato(campeonato);
        entity.setInscritos(inscritos);
        entity.setJogos(jogos);

        return entity;
    }

    @Override
    public Time update(Time entity) {
        return null;
    }
}
