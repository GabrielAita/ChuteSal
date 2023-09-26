package br.mackenzie.chutesal.domain.unidade;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.quadra.Quadra;
import br.mackenzie.chutesal.util.endereco.Endereco;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tb_unidade")
@NoArgsConstructor
@Getter
@Setter
public class Unidade {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Integer numero;

    @OneToOne
    @JsonIgnore
    private Endereco endereco;

    @OneToMany(mappedBy = "unidade", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Quadra> quadras;

    @OneToMany(mappedBy = "unidade", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Campeonato> campeonatos;

    public Unidade(String nome, Integer numero, Endereco endereco, List<Quadra> quadras, List<Campeonato> campeonatos) {
        this.nome = nome;
        this.numero = numero;
        this.endereco = endereco;
        this.quadras = quadras;
        this.campeonatos = campeonatos;
    }

    public void deleteQuadra(Quadra quadra) {
        this.quadras.remove(quadra);
    }

    public void deleteCampeonato(Campeonato campeonato) {
        this.campeonatos.remove(campeonato);
    }
}
