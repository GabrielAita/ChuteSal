package br.mackenzie.chutesal.domain.campeonato;

import br.mackenzie.chutesal.domain.campeonato.service.CampeonatoService;
import br.mackenzie.chutesal.domain.inscrito.Inscrito;
import br.mackenzie.chutesal.domain.inscrito.InscritoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/campeonato")
public class CampeonatoController {

    private final CampeonatoService campeonatoService;

    @Autowired
    public CampeonatoController(CampeonatoService campeonatoService) {
        this.campeonatoService = campeonatoService;
    }

    @GetMapping
    public ResponseEntity<List<CampeonatoDto>> readAllCampeonatos() {
        List<Campeonato> campeonatos = campeonatoService.findAll();
        return ResponseEntity.ok(new CampeonatoDto().convert(campeonatos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampeonatoDto> readCampeonatoById(@PathVariable("id") Long id) {
        Campeonato campeonato = campeonatoService.findById(id);
        return ResponseEntity.ok(new CampeonatoDto(campeonato));
    }

    @PostMapping
    public ResponseEntity<CampeonatoDto> createCampeonato(@RequestBody @Valid CampeonatoForm campeonatoForm, UriComponentsBuilder uriBuilder) {
        Campeonato campeonato = campeonatoService.create(campeonatoForm);
        URI uri = uriBuilder.path("/campeonato/{id}").buildAndExpand(campeonato.getId()).toUri();
        return ResponseEntity.created(uri).body(new CampeonatoDto(campeonato));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampeonatoDto> updateCampeonatoById(@PathVariable("id") Long id, @RequestBody @Valid CampeonatoUpdateForm campeonatoUpdateForm) {
        Campeonato campeonato = campeonatoService.update(id, campeonatoUpdateForm);
        return ResponseEntity.ok(new CampeonatoDto(campeonato));
    }

    @DeleteMapping("/{id}")
    public void deleteCampeonatoById(@PathVariable("id") Long id) {
        campeonatoService.delete(id);
    }

    @GetMapping("/{id}/inscritos")
    public ResponseEntity<List<InscritoDto>> readInscritosByCampeonatoId(@PathVariable("id") Long id) {
        List<Inscrito> inscritos = campeonatoService.findInscritosByCampeonatoId(id);
        return ResponseEntity.ok(new InscritoDto().convert(inscritos));
    }

    @PutMapping("/vencedores/{id}")
    public ResponseEntity<CampeonatoDto> insertVencedores(@PathVariable("id") Long id, @RequestBody @Valid InsertVencedorForm insertVencedorForm) {
        Campeonato campeonato = campeonatoService.insertVencedores(id, insertVencedorForm);
        return ResponseEntity.ok(new CampeonatoDto(campeonato));
    }
}
