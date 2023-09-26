package br.mackenzie.chutesal.domain.inscrito;

import br.mackenzie.chutesal.domain.time.Time;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Getter
public class InscritoDto {

    private Long id;
    private String nome;
    private String apelido;
    private String whatsapp;
    private LocalDate dataNascimento;
    private Time time;

    public InscritoDto(Inscrito inscrito) {
        this.id = inscrito.getId();
        this.nome = inscrito.getNome();
        this.apelido = inscrito.getApelido();
        this.whatsapp = inscrito.getWhatsapp();
        this.dataNascimento = inscrito.getDataNascimento();
        this.time = inscrito.getTime();
    }

    public List<InscritoDto> convert(List<Inscrito> inscritos) {
        return inscritos.stream().map(InscritoDto::new).collect(Collectors.toList());
    }
}
