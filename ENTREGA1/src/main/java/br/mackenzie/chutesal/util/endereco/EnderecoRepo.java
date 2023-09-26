package br.mackenzie.chutesal.util.endereco;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnderecoRepo extends JpaRepository<Endereco, Long> {

    Optional<Endereco> findByBairroAndLogradouro(String bairro, String logradouro);
}
