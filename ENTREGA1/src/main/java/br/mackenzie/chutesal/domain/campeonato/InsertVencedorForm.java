package br.mackenzie.chutesal.domain.campeonato;

import br.mackenzie.chutesal.domain.time.Time;
import br.mackenzie.chutesal.util.crud.UpdateForm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class InsertVencedorForm implements UpdateForm<Campeonato> {

    private Long primeiroLugarId;
    private Long segundoLugarId;
    private Long terceiroLugarId;

    public Campeonato update(Campeonato entity, Time primeiroLugar, Time segundoLugar, Time terceiroLugar) {
        entity.setPrimeiroLugar(primeiroLugar);
        entity.setSegundoLugar(segundoLugar);
        entity.setTerceiroLugar(terceiroLugar);

        return entity;
    }

    @Override
    public Campeonato update(Campeonato entity) {
        return null;
    }
}
