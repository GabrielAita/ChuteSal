package br.mackenzie.chutesal.util.endereco;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "viaCEP", url = "viacep.com.br/ws/")
public interface ViaCepClient {

    @GetMapping("{cep}/json")
    EnderecoCep findEnderecoBy(@PathVariable("cep") String cep);
}
