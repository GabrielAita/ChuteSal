package br.mackenzie.chutesal.domain.unidade;

import br.mackenzie.chutesal.domain.unidade.service.UnidadeService;
import br.mackenzie.chutesal.util.endereco.EnderecoCep;
import br.mackenzie.chutesal.util.endereco.ViaCepClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/unidade")
public class UnidadeController {

    private final UnidadeService unidadeService;
    private final ViaCepClient viaCepClient;

    @Autowired
    public UnidadeController(UnidadeService unidadeService, ViaCepClient viaCepClient) {
        this.unidadeService = unidadeService;
        this.viaCepClient = viaCepClient;
    }

    @GetMapping("/cep/{cep}")
    public EnderecoCep getEnderecoByCep(@PathVariable("cep") String cep) {
        return viaCepClient.findEnderecoBy(cep);
    }

    @GetMapping
    public ResponseEntity<List<UnidadeDto>> readAllUnidades() {
        List<Unidade> unidades = unidadeService.findAll();
        return ResponseEntity.ok(new UnidadeDto().convert(unidades));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UnidadeDto> readUnidadeById(@PathVariable("id") Long id) {
        Unidade unidade = unidadeService.findById(id);
        return ResponseEntity.ok(new UnidadeDto(unidade));
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<UnidadeDto>> readUnidadeByNome(@PathVariable("nome") String nome) {
        List<Unidade> unidades = unidadeService.findByNome(nome);
        return ResponseEntity.ok(new UnidadeDto().convert(unidades));
    }

    @PostMapping
    public ResponseEntity<UnidadeDto> createUnidade(@RequestBody @Valid UnidadeForm unidadeForm, UriComponentsBuilder uriBuilder) {
        Unidade unidade = unidadeService.create(unidadeForm);
        URI uri = uriBuilder.path("/unidade/{id}").buildAndExpand(unidade.getId()).toUri();
        return ResponseEntity.created(uri).body(new UnidadeDto(unidade));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UnidadeDto> updateUnidade(@PathVariable("id") Long id, @RequestBody @Valid UnidadeUpdateForm unidadeUpdateForm) {
        Unidade unidade = unidadeService.update(id, unidadeUpdateForm);
        return ResponseEntity.ok(new UnidadeDto(unidade));
    }

    @DeleteMapping("/{id}")
    public void deleteUnidadeById(@PathVariable("id") Long id) {
        unidadeService.delete(id);
    }
}
