package br.mackenzie.chutesal.domain.inscrito;

import br.mackenzie.chutesal.domain.inscrito.service.InscritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/inscrito")
public class InscritoController {

    private final InscritoService inscritoService;

    @Autowired
    public InscritoController(InscritoService inscritoService) {
        this.inscritoService = inscritoService;
    }

    @GetMapping
    public ResponseEntity<List<InscritoDto>> readAllInscritos() {
        List<Inscrito> inscritos = inscritoService.findAll();
        return ResponseEntity.ok(new InscritoDto().convert(inscritos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscritoDto> readInscritoById(@PathVariable("id") Long id) {
        Inscrito inscrito = inscritoService.findById(id);
        return ResponseEntity.ok(new InscritoDto(inscrito));
    }

    @PostMapping
    public ResponseEntity<InscritoDto> createInscrito(@RequestBody @Valid InscritoForm inscritoForm, UriComponentsBuilder uriBuilder) {
        Inscrito inscrito = inscritoService.create(inscritoForm);
        URI uri = uriBuilder.path("/inscrito/{id}").buildAndExpand(inscrito.getId()).toUri();
        return ResponseEntity.created(uri).body(new InscritoDto(inscrito));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InscritoDto> updateInscrito(@PathVariable("id") Long id, @RequestBody @Valid InscritoUpdateForm inscritoUpdateForm) {
        Inscrito inscrito = inscritoService.update(id, inscritoUpdateForm);
        return ResponseEntity.ok(new InscritoDto(inscrito));
    }

    @DeleteMapping("/{id}")
    public void deleteInscrito(@PathVariable("id") Long id) {
        inscritoService.delete(id);
    }
}
