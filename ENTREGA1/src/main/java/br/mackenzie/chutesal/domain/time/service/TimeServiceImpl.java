package br.mackenzie.chutesal.domain.time.service;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.campeonato.CampeonatoRepo;
import br.mackenzie.chutesal.domain.inscrito.Inscrito;
import br.mackenzie.chutesal.domain.inscrito.InscritoRepo;
import br.mackenzie.chutesal.domain.jogo.Jogo;
import br.mackenzie.chutesal.domain.jogo.JogoRepo;
import br.mackenzie.chutesal.domain.time.Time;
import br.mackenzie.chutesal.domain.time.TimeForm;
import br.mackenzie.chutesal.domain.time.TimeRepo;
import br.mackenzie.chutesal.domain.time.TimeUpdateForm;
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
public class TimeServiceImpl implements TimeService {

    private final TimeRepo timeRepo;
    private final CampeonatoRepo campeonatoRepo;
    private final InscritoRepo inscritoRepo;
    private final JogoRepo jogoRepo;

    @Autowired
    public TimeServiceImpl(TimeRepo timeRepo, CampeonatoRepo campeonatoRepo, InscritoRepo inscritoRepo, JogoRepo jogoRepo) {
        this.timeRepo = timeRepo;
        this.campeonatoRepo = campeonatoRepo;
        this.inscritoRepo = inscritoRepo;
        this.jogoRepo = jogoRepo;
    }

    @Override
    public List<Time> findAll() {
        return timeRepo.findAll();
    }

    @Override
    public Time findById(Long id) {
        Optional<Time> time = timeRepo.findById(id);
        if(time.isPresent()) {
            return time.get();
        }
        throw new NotFoundException("Time " + id + " não encontrado!");
    }

    @Override
    public Time create(Form<Time> form) {
        TimeForm timeForm = (TimeForm) form;
        Optional<Campeonato> campeonato = campeonatoRepo.findById(timeForm.getCampeonatoId());
        if(campeonato.isPresent()) {
            Time time = timeForm.convert(campeonato.get());
            return timeRepo.save(time);
        }
        throw new NotFoundException("Campeonato " + timeForm.getCampeonatoId() + " não encontrado!");
    }

    @Override
    public Time update(Long id, UpdateForm<Time> updateForm) {
        TimeUpdateForm timeUpdateForm = (TimeUpdateForm) updateForm;
        Optional<Time> time = timeRepo.findById(id);
        Optional<Campeonato> campeonato = campeonatoRepo.findById(timeUpdateForm.getCampeonatoId());
        List<Inscrito> inscritos = inscritoRepo.findAllById(timeUpdateForm.getInscritosId());
        List<Jogo> jogos = jogoRepo.findAllById(timeUpdateForm.getJogosId());
        if(time.isPresent() && campeonato.isPresent()) {
            return timeUpdateForm.update(time.get(), campeonato.get(), inscritos, jogos);
        }
        throw new NotFoundException("Time ou campeonato não encontrado!");
    }

    @Override
    public void delete(Long id) {
        Optional<Time> time = timeRepo.findById(id);
        if(time.isPresent()) {
            timeRepo.delete(time.get());
        } else {
            throw new NotFoundException("Time " + id + " não encontrado!");
        }
    }
}
