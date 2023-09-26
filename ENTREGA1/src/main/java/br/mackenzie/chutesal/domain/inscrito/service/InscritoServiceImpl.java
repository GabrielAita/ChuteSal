package br.mackenzie.chutesal.domain.inscrito.service;

import br.mackenzie.chutesal.domain.campeonato.Campeonato;
import br.mackenzie.chutesal.domain.campeonato.CampeonatoRepo;
import br.mackenzie.chutesal.domain.inscrito.Inscrito;
import br.mackenzie.chutesal.domain.inscrito.InscritoForm;
import br.mackenzie.chutesal.domain.inscrito.InscritoRepo;
import br.mackenzie.chutesal.domain.inscrito.InscritoUpdateForm;
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
public class InscritoServiceImpl implements InscritoService {

    private final InscritoRepo inscritoRepo;
    private final CampeonatoRepo campeonatoRepo;
    private final TimeRepo timeRepo;

    @Autowired
    public InscritoServiceImpl(InscritoRepo inscritoRepo, CampeonatoRepo campeonatoRepo, TimeRepo timeRepo) {
        this.inscritoRepo = inscritoRepo;
        this.campeonatoRepo = campeonatoRepo;
        this.timeRepo = timeRepo;
    }


    @Override
    public List<Inscrito> findAll() {
        return inscritoRepo.findAll();
    }

    @Override
    public Inscrito findById(Long id) {
        Optional<Inscrito> inscrito = inscritoRepo.findById(id);
        if(inscrito.isPresent()) {
            return inscrito.get();
        }
        throw new NotFoundException("Inscrito " + id + " não encontrado!");
    }

    @Override
    public Inscrito create(Form<Inscrito> form) {
        InscritoForm inscritoForm = (InscritoForm) form;
        Optional<Campeonato> campeonato = campeonatoRepo.findById(inscritoForm.getCampeonatoId());
        if(campeonato.isPresent()) {
            return inscritoRepo.save(inscritoForm.convert(campeonato.get()));
        }
        throw new NotFoundException("Campeonato " + inscritoForm.getCampeonatoId() + " não encontrado!");
    }

    @Override
    public Inscrito update(Long id, UpdateForm<Inscrito> updateForm) {
        InscritoUpdateForm inscritoUpdateForm = (InscritoUpdateForm) updateForm;
        Optional<Inscrito> inscrito = inscritoRepo.findById(id);
        Optional<Time> time = timeRepo.findById(inscritoUpdateForm.getTimeId());
        if(inscrito.isPresent()) {
            if(inscritoUpdateForm.getTimeId() == 0) {
                return inscritoUpdateForm.update(inscrito.get(), null);
            } else if (time.isPresent()) {
                return inscritoUpdateForm.update(inscrito.get(), time.get());
            }
            throw new NotFoundException("Time " + id + " não encontrado!");
        }
        throw new NotFoundException("Inscrito " + id + " não encontrado!");
    }

    @Override
    public void delete(Long id) {
        Optional<Inscrito> inscrito = inscritoRepo.findById(id);
        if(inscrito.isPresent()) {
            inscritoRepo.delete(inscrito.get());
        } else {
            throw new NotFoundException("Inscrito " + id + " não encontrado!");
        }
    }
}
