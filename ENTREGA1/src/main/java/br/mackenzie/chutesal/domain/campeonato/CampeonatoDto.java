package br.mackenzie.chutesal.domain.campeonato;

import br.mackenzie.chutesal.domain.inscrito.Inscrito;
import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.time.Time;
import br.mackenzie.chutesal.domain.unidade.Unidade;
import br.mackenzie.chutesal.util.status.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Getter
public class CampeonatoDto {

    private Long id;
    private String nome;
    private Status status;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataInicialInscricao;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataFinalInscricao;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataInicialJogos;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataFinalJogos;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate inicioDivulgacao;
    private Unidade unidade;
    private List<Jogo> jogos;
    private List<Time> times;
    private List<Inscrito> inscritos;
    private Time primeiroLugar;
    private Time segundoLugar;
    private Time terceiroLugar;

    public CampeonatoDto(Campeonato campeonato) {
        this.id = campeonato.getId();
        this.nome = campeonato.getNome();
        this.status = campeonato.getStatus();
        this.dataInicialInscricao = campeonato.getDataInicialInscricao();
        this.dataFinalInscricao = campeonato.getDataFinalInscricao();
        this.dataInicialJogos = campeonato.getDataInicialJogos();
        this.dataFinalJogos = campeonato.getDataFinalJogos();
        this.inicioDivulgacao = campeonato.getInicioDivulgacao();
        this.unidade = campeonato.getUnidade();
        this.jogos = campeonato.getJogos();
        this.times = campeonato.getTimes();
        this.inscritos = campeonato.getInscritos();
        this.primeiroLugar = campeonato.getPrimeiroLugar();
        this.segundoLugar = campeonato.getSegundoLugar();
        this.terceiroLugar = campeonato.getTerceiroLugar();
    }

    public List<CampeonatoDto> convert(List<Campeonato> campeonatos) {
        return campeonatos.stream().map(CampeonatoDto::new).collect(Collectors.toList());
    }
}
