package br.mackenzie.chutesal.domain.unidade.service;

import br.mackenzie.chutesal.domain.unidade.Unidade;
import br.mackenzie.chutesal.util.crud.CrudService;

import java.util.List;

public interface UnidadeService extends CrudService<Unidade> {

    List<Unidade> findByNome(String nome);

    void deleteQuadra(Long unidadeId, Long quadraId);

    void deleteCampeonato(Long unidadeId, Long campeonatoId);
}
