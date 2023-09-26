package br.mackenzie.chutesal.domain.time;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.util.crud.Form;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TimeForm implements Form<Time> {

    @NotBlank
    private String nome;
    @NotNull
    private Long campeonatoId;

    public Time convert(Campeonato campeonato) {
        return new Time(nome, campeonato);
    }

    @Override
    public Time convert() {
        return null;
    }
}
