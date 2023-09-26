package br.mackenzie.chutesal.util.crud;

import java.util.List;

public interface CrudService<T> {

    List<T> findAll();

    T findById(Long id);

    T create(Form<T> form);

    T update(Long id, UpdateForm<T> updateForm);

    void delete(Long id);
}
