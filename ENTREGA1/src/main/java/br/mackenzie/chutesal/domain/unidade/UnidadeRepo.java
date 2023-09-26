package br.mackenzie.chutesal.domain.unidade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnidadeRepo extends JpaRepository<Unidade, Long> {

    List<Unidade> findAllByNome(String nome);
}
