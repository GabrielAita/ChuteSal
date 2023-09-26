package br.mackenzie.chutesal.domain.quadra;

import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.unidade.Unidade;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_quadra")
@NoArgsConstructor
@Getter
@Setter
public class Quadra {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    @ManyToOne
    @JsonIgnore
    private Unidade unidade;

    @OneToMany(mappedBy = "quadra", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Jogo> jogos = new ArrayList<>();

    public Quadra(String nome, Unidade unidade, List<Jogo> jogos) {
        this.nome = nome;
        this.unidade = unidade;
        this.jogos = jogos;
    }

    public void deleteJogos() {
        this.jogos.clear();
    }
}
