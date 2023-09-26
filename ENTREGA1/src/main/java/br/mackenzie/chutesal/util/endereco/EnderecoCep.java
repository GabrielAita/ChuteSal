package br.mackenzie.chutesal.util.endereco;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EnderecoCep {

    private String cep;
    private String logradouro;
    private String bairro;
    private String localidade;
    private String uf;
}
