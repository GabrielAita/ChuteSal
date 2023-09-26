package br.mackenzie.chutesal.util.endereco;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "tb_endereco")
@NoArgsConstructor
@Getter
@Setter
public class Endereco {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cep;
    private Integer numero;
    private String logradouro;
    private String bairro;
    private String localidade;
    private String uf;

    public Endereco(String cep, Integer numero, String logradouro, String bairro, String localidade, String uf) {
        this.cep = cep;
        this.numero = numero;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.localidade = localidade;
        this.uf = uf;
    }
}
