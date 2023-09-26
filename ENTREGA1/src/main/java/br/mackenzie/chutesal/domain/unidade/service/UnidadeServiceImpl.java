package br.mackenzie.chutesal.domain.unidade.service;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.campeonato.CampeonatoRepo;
import br.mackenzie.chutesal.domain.quadra.Quadra;
import br.mackenzie.chutesal.domain.quadra.QuadraRepo;
import br.mackenzie.chutesal.domain.unidade.Unidade;
import br.mackenzie.chutesal.domain.unidade.UnidadeForm;
import br.mackenzie.chutesal.domain.unidade.UnidadeRepo;
import br.mackenzie.chutesal.domain.unidade.UnidadeUpdateForm;
import br.mackenzie.chutesal.util.crud.Form;
import br.mackenzie.chutesal.util.crud.UpdateForm;
import br.mackenzie.chutesal.util.endereco.Endereco;
import br.mackenzie.chutesal.util.endereco.EnderecoRepo;
import br.mackenzie.chutesal.util.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UnidadeServiceImpl implements UnidadeService {

    private final UnidadeRepo unidadeRepo;
    private final QuadraRepo quadraRepo;
    private final CampeonatoRepo campeonatoRepo;
    private final EnderecoRepo enderecoRepo;

    @Autowired
    public UnidadeServiceImpl(UnidadeRepo unidadeRepo, QuadraRepo quadraRepo, CampeonatoRepo campeonatoRepo, EnderecoRepo enderecoRepo) {
        this.unidadeRepo = unidadeRepo;
        this.quadraRepo = quadraRepo;
        this.campeonatoRepo = campeonatoRepo;
        this.enderecoRepo = enderecoRepo;
    }

    @Override
    public List<Unidade> findAll() {
        return unidadeRepo.findAll();
    }

    @Override
    public List<Unidade> findByNome(String nome) {
        return unidadeRepo.findAllByNome(nome);
    }

    @Override
    public Unidade findById(Long id) {
        Optional<Unidade> unidade = unidadeRepo.findById(id);
        if(unidade.isPresent()) {
            return unidade.get();
        }
        throw new NotFoundException("Unidade " + id + " não encontrada!");
    }

    @Override
    public Unidade create(Form<Unidade> form) {
        UnidadeForm unidadeForm = (UnidadeForm) form;

        List<Quadra> quadras = quadraRepo.findAllById(unidadeForm.getQuadrasId());
        List<Campeonato> campeonatos = campeonatoRepo.findAllById(unidadeForm.getCampeonatosId());
        Optional<Endereco> endereco = enderecoRepo.findByBairroAndLogradouro(unidadeForm.getEndereco().getBairro(),
                unidadeForm.getEndereco().getLogradouro());

        if(endereco.isPresent()) {
            Unidade unidade = unidadeForm.convert(quadras, campeonatos, endereco.get());
            return unidadeRepo.save(unidade);
        }

        Unidade unidade = unidadeForm.convert(quadras, campeonatos, enderecoRepo.save(unidadeForm.getEndereco().convert()));
        return unidadeRepo.save(unidade);
    }

    @Override
    public Unidade update(Long id, UpdateForm<Unidade> updateForm) {
        UnidadeUpdateForm unidadeUpdateForm = (UnidadeUpdateForm) updateForm;

        Optional<Unidade> unidade = unidadeRepo.findById(id);
        List<Quadra> quadras = quadraRepo.findAllById(unidadeUpdateForm.getQuadrasId());
        List<Campeonato> campeonatos = campeonatoRepo.findAllById(unidadeUpdateForm.getCampeonatosId());
        Optional<Endereco> endereco = enderecoRepo.findByBairroAndLogradouro(unidadeUpdateForm.getEndereco().getBairro(),
                unidadeUpdateForm.getEndereco().getLogradouro());

        if(unidade.isPresent()) {
            if(endereco.isPresent()) {
                return unidadeUpdateForm.update(unidade.get(), quadras, campeonatos, endereco.get());
            }
            return unidadeUpdateForm.update(unidade.get(), quadras, campeonatos, enderecoRepo.save(unidadeUpdateForm.getEndereco()));
        } else {
            throw new NotFoundException("Unidade " + id + " não encontrada!");
        }
    }

    @Override
    public void delete(Long id) {
        Optional<Unidade> unidade = unidadeRepo.findById(id);
        if(unidade.isPresent()) {
            unidadeRepo.delete(unidade.get());
        } else {
            throw new NotFoundException("Unidade " + id + " não encontrada!");
        }
    }

    @Override
    public void deleteQuadra(Long unidadeId, Long quadraId) {
        Optional<Unidade> unidade = unidadeRepo.findById(unidadeId);
        Optional<Quadra> quadra = quadraRepo.findById(quadraId);
        if(unidade.isPresent()) {
            quadra.ifPresent(quadraEntity -> unidade.get().deleteQuadra(quadraEntity));
            throw new NotFoundException("Quadra " + quadraId + " não encontrada!");
        }
        throw new NotFoundException("Unidade " + unidadeId + " não encontrada!");
    }

    @Override
    public void deleteCampeonato(Long unidadeId, Long campeonatoId) {
        Optional<Unidade> unidade = unidadeRepo.findById(unidadeId);
        Optional<Campeonato> campeonato = campeonatoRepo.findById(campeonatoId);
        if(unidade.isPresent()) {
            campeonato.ifPresent(campeonatoEntity -> unidade.get().deleteCampeonato(campeonatoEntity));
            throw new NotFoundException("Campeonato " + campeonatoId + " não encontrado!");
        }
        throw new NotFoundException("Unidade " + unidadeId + " não encontrada!");
    }
}
