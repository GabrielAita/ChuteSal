package br.mackenzie.chutesal.domain.time;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.inscrito.Inscrito;
import br.mackenzie.chutesal.domain.jogo.Jogo;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Getter
public class TimeDto {

    private Long id;
    private String nome;
    private Campeonato campeonato;
    private List<Inscrito> inscritos;
    private List<Jogo> jogos;

    public TimeDto(Time time) {
        this.id = time.getId();
        this.nome = time.getNome();
        this.campeonato = time.getCampeonato();
        this.inscritos = time.getInscritos();
        this.jogos = time.getJogos();
    }

    public List<TimeDto> convert(List<Time> times) {
        return times.stream().map(TimeDto::new).collect(Collectors.toList());
    }
}
