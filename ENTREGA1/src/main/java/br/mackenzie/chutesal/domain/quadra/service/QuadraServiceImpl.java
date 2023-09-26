package br.mackenzie.chutesal.domain.quadra.service;

import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.jogo.JogoRepo;
import br.mackenzie.chutesal.domain.jogo.service.JogoService;
import br.mackenzie.chutesal.domain.quadra.*;
import br.mackenzie.chutesal.domain.unidade.Unidade;
import br.mackenzie.chutesal.domain.unidade.UnidadeRepo;
import br.mackenzie.chutesal.util.crud.Form;
import br.mackenzie.chutesal.util.crud.UpdateForm;
import br.mackenzie.chutesal.util.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuadraServiceImpl implements QuadraService {

    private final QuadraRepo quadraRepo;
    private final UnidadeRepo unidadeRepo;
    private final JogoRepo jogoRepo;
    private final JogoService jogoService;

    @Autowired
    public QuadraServiceImpl(QuadraRepo quadraRepo, UnidadeRepo unidadeRepo, JogoRepo jogoRepo, JogoService jogoService) {
        this.quadraRepo = quadraRepo;
        this.unidadeRepo = unidadeRepo;
        this.jogoRepo = jogoRepo;
        this.jogoService = jogoService;
    }

    @Override
    public List<Quadra> findAll() {
        return quadraRepo.findAll();
    }

    @Override
    public Quadra findById(Long id) {
        Optional<Quadra> quadra = quadraRepo.findById(id);
        if(quadra.isPresent()) {
            return quadra.get();
        } else {
            throw new NotFoundException("Quadra " + id + " não encontrada!");
        }
    }

    @Override
    public Quadra create(Form<Quadra> form) {
        QuadraForm quadraForm = (QuadraForm) form;

        Optional<Unidade> unidade = unidadeRepo.findById(quadraForm.getUnidadeId());
        List<Jogo> jogos = jogoRepo.findAllById(quadraForm.getJogosId());

        if(unidade.isPresent()) {
            Quadra quadra = quadraForm.convert(unidade.get(), jogos);
            return quadraRepo.save(quadra);
        } else {
            throw new NotFoundException("Unidade " + quadraForm.getUnidadeId() + " não encontrada!");
        }
    }

    @Override
    public Quadra update(Long id, UpdateForm<Quadra> updateForm) {
        QuadraUpdateForm quadraUpdateForm = (QuadraUpdateForm) updateForm;

        Optional<Quadra> quadra = quadraRepo.findById(id);
        Optional<Unidade> unidade = unidadeRepo.findById(quadraUpdateForm.getUnidadeId());
        List<Jogo> jogos = jogoRepo.findAllById(quadraUpdateForm.getJogosId());

        if(quadra.isPresent() && unidade.isPresent()) {
            return quadraUpdateForm.update(quadra.get(), unidade.get(), jogos);
        } else {
            throw new NotFoundException("Não foi possível alterar a quadra!");
        }
    }

    @Override
    public void delete(Long id) {
        Optional<Quadra> quadra = quadraRepo.findById(id);
        if(quadra.isPresent()) {
            List<Long> jogos = quadra.get().getJogos().stream().map(Jogo::getId).collect(Collectors.toList());
            jogos.forEach(jogoService::delete);
            quadra.get().deleteJogos();
            quadraRepo.delete(quadra.get());
        } else {
            throw new NotFoundException("Quadra " + id + " não encontrada!");
        }
    }
}
