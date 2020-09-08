package app.qienuren.controller;

import app.qienuren.model.TijdelijkePersoon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class TijdelijkePersoonService {

    @Autowired
    TijdelijkePersoonRepository tijdelijkePersoonRepository;
    @Autowired
    PersoonRepository persoonRepository;


    public TijdelijkePersoon getById(long oorspronkelijkeId) {
        ArrayList<TijdelijkePersoon> alleTijdelijkePersonen = (ArrayList<TijdelijkePersoon>)tijdelijkePersoonRepository.findAll();
        TijdelijkePersoon terugTeSturenTijdelijkePersoon = null;
        for (TijdelijkePersoon tt : alleTijdelijkePersonen) {
            if (tt.getOorspronkelijkeId() == oorspronkelijkeId) {
                terugTeSturenTijdelijkePersoon = tt;
            }
        }
        return terugTeSturenTijdelijkePersoon;
    }


    public Iterable<TijdelijkePersoon> getallTijdelijkePersonen() {
        return tijdelijkePersoonRepository.findAll();
    }

    public void deleteTijdelijkePersoonById(long id) {
        System.out.println("tijdelijke wijziging is verwijderd");
        tijdelijkePersoonRepository.deleteById(id);
    }
}
