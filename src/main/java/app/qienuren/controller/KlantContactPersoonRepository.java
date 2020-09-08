package app.qienuren.controller;

import app.qienuren.model.Bedrijf;
import app.qienuren.model.KlantContactPersoon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KlantContactPersoonRepository extends JpaRepository<KlantContactPersoon, Long> {

    Optional<KlantContactPersoon> findByEmail(String email);

}
