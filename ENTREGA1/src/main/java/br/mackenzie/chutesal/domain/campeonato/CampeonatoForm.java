package br.mackenzie.chutesal.domain.campeonato;

import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.time.Time;
import br.mackenzie.chutesal.domain.unidade.Unidade;
import br.mackenzie.chutesal.util.crud.Form;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CampeonatoForm implements Form<Campeonato> {

    @NotBlank
    private String nome;
    @NotNull @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataInicialInscricao;
    @NotNull @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataFinalInscricao;
    @NotNull @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataInicialJogos;
    @NotNull @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataFinalJogos;
    @NotNull @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate inicioDivulgacao;
    @NotNull
    private Long unidadeId;
    private List<Long> jogosId;
    private List<Long> timesId;

    public Campeonato convert(Unidade unidade, List<Jogo> jogos, List<Time> times) {
        return new Campeonato(this.nome, this.dataInicialInscricao, this.dataFinalInscricao, this.dataInicialJogos,
                this.dataFinalJogos, this.inicioDivulgacao, unidade, jogos, times);
    }

    @Override
    public Campeonato convert() {
        return null;
    }
}
