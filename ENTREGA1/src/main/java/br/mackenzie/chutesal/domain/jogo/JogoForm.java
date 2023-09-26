package br.mackenzie.chutesal.domain.jogo;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.quadra.Quadra;
import br.mackenzie.chutesal.domain.time.Time;
import br.mackenzie.chutesal.util.crud.Form;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JogoForm implements Form<Jogo> {

    @NotNull @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime horario;
    @NotNull
    private Long campeonatoId;
    @NotNull
    private Long quadraId;
    @NotNull
    private List<Long> timesId;

    public Jogo convert(Campeonato campeonato, Quadra quadra, List<Time> times) {
        return new Jogo(this.horario, campeonato, quadra, times);
    }

    @Override
    public Jogo convert() {
        return null;
    }
}
