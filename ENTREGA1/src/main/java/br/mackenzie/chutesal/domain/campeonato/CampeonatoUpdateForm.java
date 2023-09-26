package br.mackenzie.chutesal.domain.campeonato;

import br.mackenzie.chutesal.domain.inscrito.Inscrito;
import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.time.Time;
import br.mackenzie.chutesal.util.crud.UpdateForm;
import br.mackenzie.chutesal.util.status.Status;
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
public class CampeonatoUpdateForm implements UpdateForm<Campeonato> {

    @NotBlank
    private String nome;
    @NotNull
    private Status status;
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
    private List<Long> jogosId;
    private List<Long> timesId;
    private List<Long> inscritosId;

    public Campeonato update(Campeonato entity, List<Jogo> jogos, List<Time> times, List<Inscrito> inscritos) {
        entity.setNome(this.nome);
        entity.setStatus(this.status);
        entity.setDataInicialInscricao(this.dataInicialInscricao);
        entity.setDataFinalInscricao(this.dataFinalInscricao);
        entity.setDataInicialJogos(this.dataInicialJogos);
        entity.setDataFinalJogos(this.dataFinalJogos);
        entity.setJogos(jogos);
        entity.setTimes(times);
        entity.setInscritos(inscritos);

        return entity;
    }

    @Override
    public Campeonato update(Campeonato entity) {
        return null;
    }
}
