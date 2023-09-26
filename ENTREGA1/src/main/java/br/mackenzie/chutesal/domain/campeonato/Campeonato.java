package br.mackenzie.chutesal.domain.campeonato;

import br.mackenzie.chutesal.domain.inscrito.Inscrito;
import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.time.Time;
import br.mackenzie.chutesal.domain.unidade.Unidade;
import br.mackenzie.chutesal.util.status.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_campeonato")
@NoArgsConstructor
@Getter
@Setter
public class Campeonato {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    private String nome;
    private Status status = Status.PLANEJADO;
    private LocalDate dataInicialInscricao;
    private LocalDate dataFinalInscricao;
    private LocalDate dataInicialJogos;
    private LocalDate dataFinalJogos;
    private LocalDate inicioDivulgacao;

    @OneToOne
    private Time primeiroLugar;
    @OneToOne
    private Time segundoLugar;
    @OneToOne
    private Time terceiroLugar;

    @ManyToOne
    @JsonIgnore
    private Unidade unidade;

    @OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Jogo> jogos = new ArrayList<>();

    @OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Time> times = new ArrayList<>();

    @OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Inscrito> inscritos = new ArrayList<>();

    public Campeonato(String nome,
                      LocalDate dataInicialInscricao, LocalDate dataFinalInscricao, LocalDate dataInicialJogos, LocalDate dataFinalJogos, LocalDate inicioDivulgacao,
                      Unidade unidade, List<Jogo> jogos, List<Time> times) {
        this.nome = nome;
        this.dataInicialInscricao = dataInicialInscricao;
        this.dataFinalInscricao = dataFinalInscricao;
        this.dataInicialJogos = dataInicialJogos;
        this.dataFinalJogos = dataFinalJogos;
        this.inicioDivulgacao = inicioDivulgacao;
        this.unidade = unidade;
        this.jogos = jogos;
        this.times = times;
    }

    public void deleteTime(Time time) {
        this.times.remove(time);
    }
}
