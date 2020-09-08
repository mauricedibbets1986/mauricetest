package app.qienuren.controller;

import app.qienuren.model.Persoon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PersoonRepository extends JpaRepository<Persoon, Long> {

    Optional<Persoon> findByUserName(String username);
}
