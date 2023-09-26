package br.mackenzie.chutesal.util.endereco;

import br.mackenzie.chutesal.util.crud.Form;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EnderecoForm implements Form<Endereco> {

    private String cep;
    private Integer numero;
    private String logradouro;
    private String bairro;
    private String localidade;
    private String uf;

    @Override
    public Endereco convert() {
        return new Endereco(this.cep, this.numero, this.logradouro, this.bairro, this.localidade, this.uf);
    }
}
