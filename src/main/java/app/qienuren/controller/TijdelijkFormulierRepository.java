package app.qienuren.controller;

import app.qienuren.model.TijdelijkFormulier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TijdelijkFormulierRepository extends CrudRepository<TijdelijkFormulier, Long> {

}
