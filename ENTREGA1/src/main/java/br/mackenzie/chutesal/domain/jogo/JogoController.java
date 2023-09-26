package br.mackenzie.chutesal.domain.jogo;

import br.mackenzie.chutesal.domain.jogo.service.JogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/jogo")
public class JogoController {

    private final JogoService jogoService;

    @Autowired
    public JogoController(JogoService jogoService) {
        this.jogoService = jogoService;
    }

    @GetMapping
    public ResponseEntity<List<JogoDto>> readAllJogos() {
        List<Jogo> jogos = jogoService.findAll();
        return ResponseEntity.ok(new JogoDto().convert(jogos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JogoDto> readJogoById(@PathVariable("id") Long id) {
        Jogo jogo = jogoService.findById(id);
        return ResponseEntity.ok(new JogoDto(jogo));
    }

    @PostMapping
    public ResponseEntity<JogoDto> createJogo(@RequestBody @Valid JogoForm jogoForm, UriComponentsBuilder uriComponentsBuilder) {
        Jogo jogo = jogoService.create(jogoForm);
        URI uri = uriComponentsBuilder.path("/jogo/{id}").buildAndExpand(jogo.getId()).toUri();
        return ResponseEntity.created(uri).body(new JogoDto(jogo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JogoDto> updateJogoById(@PathVariable("id") Long id, @RequestBody @Valid JogoUpdateForm jogoUpdateForm) {
        Jogo jogo = jogoService.update(id, jogoUpdateForm);
        return ResponseEntity.ok(new JogoDto(jogo));
    }

    @DeleteMapping("/{id}")
    public void deleteCampeonatoById(@PathVariable("id") Long id) {
        jogoService.delete(id);
    }
}
