package br.mackenzie.chutesal.domain.quadra;

import br.mackenzie.chutesal.domain.quadra.service.QuadraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/quadra")
public class QuadraController {

    private final QuadraService quadraService;

    @Autowired
    public QuadraController(QuadraService quadraService) {
        this.quadraService = quadraService;
    }

    @GetMapping
    public ResponseEntity<List<QuadraDto>> readAllQuadras() {
        List<Quadra> quadras = quadraService.findAll();
        return ResponseEntity.ok(new QuadraDto().convert(quadras));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuadraDto> readQuadraById(@PathVariable("id") Long id) {
        Quadra quadra = quadraService.findById(id);
        return ResponseEntity.ok(new QuadraDto(quadra));
    }

    @PostMapping
    public ResponseEntity<QuadraDto> createQuadra(@RequestBody @Valid QuadraForm quadraForm, UriComponentsBuilder uriBuilder) {
        Quadra quadra = quadraService.create(quadraForm);
        URI uri = uriBuilder.path("/quadra/{id}").buildAndExpand(quadra.getId()).toUri();
        return ResponseEntity.created(uri).body(new QuadraDto(quadra));
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuadraDto> updateQuadra(@PathVariable("id") Long id, @RequestBody @Valid QuadraUpdateForm quadraUpdateForm) {
        Quadra quadra = quadraService.update(id, quadraUpdateForm);
        return ResponseEntity.ok(new QuadraDto(quadra));
    }

    @DeleteMapping("/{id}")
    public void deleteQuadraById(@PathVariable("id") Long id) {
        quadraService.delete(id);
    }
}
