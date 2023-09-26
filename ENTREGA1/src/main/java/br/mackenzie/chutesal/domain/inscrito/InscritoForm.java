package br.mackenzie.chutesal.domain.inscrito;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.util.crud.Form;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class InscritoForm implements Form<Inscrito> {

    @NotBlank
    private String nome;
    private String apelido = "";
    @NotBlank
    private String whatsapp;
    @NotNull @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataNascimento;

    private Long CampeonatoId;

    public Inscrito convert(Campeonato campeonato) {
        return new Inscrito(nome, apelido, whatsapp, dataNascimento, campeonato);
    }

    @Override
    public Inscrito convert() {
        return null;
    }
}
