package br.mackenzie.chutesal.domain.time;

import br.mackenzie.chutesal.domain.time.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/time")
public class TimeController {

    private final TimeService timeService;

    @Autowired
    public TimeController(TimeService timeService) {
        this.timeService = timeService;
    }

    @GetMapping
    public ResponseEntity<List<TimeDto>> readAllTimes() {
        List<Time> times = timeService.findAll();
        return ResponseEntity.ok(new TimeDto().convert(times));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeDto> readTimeById(@PathVariable("id") Long id) {
        Time time = timeService.findById(id);
        return ResponseEntity.ok(new TimeDto(time));
    }

    @PostMapping
    public ResponseEntity<TimeDto> createTime(@RequestBody @Valid TimeForm timeForm, UriComponentsBuilder uriBuilder) {
        Time time = timeService.create(timeForm);
        URI uri = uriBuilder.path("/time/{id}").buildAndExpand(time.getId()).toUri();
        return ResponseEntity.created(uri).body(new TimeDto(time));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimeDto> updateTime(@PathVariable("id") Long id, @RequestBody @Valid TimeUpdateForm timeUpdateForm) {
        Time time = timeService.update(id, timeUpdateForm);
        return ResponseEntity.ok(new TimeDto(time));
    }

    @DeleteMapping("/{id}")
    public void deleteTimeById(@PathVariable("id") Long id) {
        timeService.delete(id);
    }
}
