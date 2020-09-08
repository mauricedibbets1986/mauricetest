package app.qienuren.controller;

import app.qienuren.model.Formulier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormulierRepository extends CrudRepository<Formulier, Long> {
}
