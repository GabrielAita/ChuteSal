package br.mackenzie.chutesal.domain.jogo.service;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.campeonato.CampeonatoRepo;
import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.jogo.JogoForm;
import br.mackenzie.chutesal.domain.jogo.JogoRepo;
import br.mackenzie.chutesal.domain.jogo.JogoUpdateForm;
import br.mackenzie.chutesal.domain.quadra.Quadra;
import br.mackenzie.chutesal.domain.quadra.QuadraRepo;
import br.mackenzie.chutesal.domain.time.Time;
import br.mackenzie.chutesal.domain.time.TimeRepo;
import br.mackenzie.chutesal.util.crud.Form;
import br.mackenzie.chutesal.util.crud.UpdateForm;
import br.mackenzie.chutesal.util.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class JogoServiceImpl implements JogoService {

    private final JogoRepo jogoRepo;
    private final CampeonatoRepo campeonatoRepo;
    private final QuadraRepo quadraRepo;
    private final TimeRepo timeRepo;

    @Autowired
    public JogoServiceImpl(JogoRepo jogoRepo, CampeonatoRepo campeonatoRepo, QuadraRepo quadraRepo, TimeRepo timeRepo) {
        this.jogoRepo = jogoRepo;
        this.campeonatoRepo = campeonatoRepo;
        this.quadraRepo = quadraRepo;
        this.timeRepo = timeRepo;
    }

    @Override
    public List<Jogo> findAll() {
        return jogoRepo.findAll();
    }

    @Override
    public Jogo findById(Long id) {
        Optional<Jogo> jogo = jogoRepo.findById(id);
        if(jogo.isPresent()) {
            return jogo.get();
        }
        throw new NotFoundException("Jogo " + id + " não encontrado!");
    }

    @Override
    public Jogo create(Form<Jogo> form) {
        JogoForm jogoForm = (JogoForm) form;
        Optional<Campeonato> campeonato = campeonatoRepo.findById(jogoForm.getCampeonatoId());
        Optional<Quadra> quadra = quadraRepo.findById(jogoForm.getQuadraId());
        List<Time> times = timeRepo.findAllById(jogoForm.getTimesId());
        if(campeonato.isPresent() && quadra.isPresent()) {
            Jogo jogo = jogoForm.convert(campeonato.get(), quadra.get(), times);
            times.forEach(time -> time.addJogo(jogo));
            return jogoRepo.save(jogo);
        }
        throw new NotFoundException("Quadra " + jogoForm.getQuadraId() + " não encontrada ou Campeonato " + jogoForm.getCampeonatoId() + " não encontrado!");
    }

    @Override
    public Jogo update(Long id, UpdateForm<Jogo> updateForm) {
        JogoUpdateForm jogoUpdateForm = (JogoUpdateForm) updateForm;
        Optional<Jogo> jogo = jogoRepo.findById(id);
        if(jogo.isPresent()) {
            Optional<Campeonato> campeonato = campeonatoRepo.findById(jogoUpdateForm.getCampeonatoId());
            Optional<Quadra> quadra = quadraRepo.findById(jogoUpdateForm.getQuadraId());
            List<Time> times = timeRepo.findAllById(jogoUpdateForm.getTimesId());
            if(campeonato.isPresent() && quadra.isPresent()) {
                return jogoUpdateForm.update(jogo.get(), campeonato.get(), quadra.get(), times);
            }
            throw new NotFoundException("Quadra " + jogoUpdateForm.getQuadraId() + " não encontrada ou Campeonato " + jogoUpdateForm.getCampeonatoId() + " não encontrado!");
        } else {
            throw new NotFoundException("Jogo " + id + " não encontrado!");
        }
    }

    @Override
    public void delete(Long id) {
        Optional<Jogo> jogo = jogoRepo.findById(id);
        if(jogo.isPresent()) {
            List<Time> jogoTimes = jogo.get().getTimes();
            jogoTimes.forEach(jogoTime -> jogoTime.deleteJogo(jogo.get()));
            jogoRepo.delete(jogo.get());
        } else {
            throw new NotFoundException("Jogo " + id + " não encontrado!");
        }
    }
}
