package br.mackenzie.chutesal.domain.inscrito;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InscritoRepo extends JpaRepository<Inscrito, Long> {

    List<Inscrito> findAllByCampeonatoId(Long campeonatoId);
}
