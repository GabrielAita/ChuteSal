package br.mackenzie.chutesal.domain.inscrito;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.time.Time;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_inscrito")
@NoArgsConstructor
@Getter
@Setter
public class Inscrito {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String apelido = "";
    private String whatsapp;
    private LocalDate dataNascimento;

    @ManyToOne
    @JsonIgnore
    private Time time;

    @ManyToOne
    @JsonIgnore
    private Campeonato campeonato;

    public Inscrito(String nome, String apelido, String whatsapp, LocalDate dataNascimento, Campeonato campeonato) {
        this.nome = nome;
        this.apelido = apelido;
        this.whatsapp = whatsapp;
        this.dataNascimento = dataNascimento;
        this.campeonato = campeonato;
    }
}
