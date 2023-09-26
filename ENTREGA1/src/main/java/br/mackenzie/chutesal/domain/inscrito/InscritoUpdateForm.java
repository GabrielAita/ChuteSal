package br.mackenzie.chutesal.domain.inscrito;

import br.mackenzie.chutesal.domain.time.Time;
import br.mackenzie.chutesal.util.crud.UpdateForm;
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
public class InscritoUpdateForm implements UpdateForm<Inscrito> {

    @NotBlank
    private String nome;
    private String apelido = "";
    @NotBlank
    private String whatsapp;
    @NotNull @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataNascimento;
    @NotNull
    private Long timeId;

    public Inscrito update(Inscrito entity, Time time) {
        entity.setNome(this.nome);
        entity.setApelido(this.apelido);
        entity.setWhatsapp(this.whatsapp);
        entity.setDataNascimento(dataNascimento);
        entity.setTime(time);

        return entity;
    }

    @Override
    public Inscrito update(Inscrito entity) {
        return null;
    }
}
