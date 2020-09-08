package app.qienuren.rest;

import app.qienuren.controller.PersoonService;

import app.qienuren.controller.TijdelijkePersoonService;
import app.qienuren.model.Persoon;
//import app.qienuren.model.User;
import app.qienuren.model.TijdelijkeInterneMedewerker;
import app.qienuren.model.TijdelijkePersoon;
import app.qienuren.model.Trainee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserEndpoint {

    @Autowired
    PersoonService persoonService;
    @Autowired
    TijdelijkePersoonService tijdelijkePersoonService;

    @PostMapping("/add")
    public Persoon newTrainee(@RequestBody Persoon persoon) {
        //persoon.setEmail(persoon.getUserName());
        return persoonService.addPersoon(persoon);
    }

    @GetMapping("/test")
    public String test(){return "het werkt";}

    @GetMapping("/{id}")
    public Persoon getPersoonById(@PathVariable(value = "id") long id) {
        return persoonService.getById(id);
    }

    @GetMapping("/tijdelijkepersoon/{id}")
    public TijdelijkePersoon getTijdelijkePersoonById(@PathVariable(value = "id") long id){
        return tijdelijkePersoonService.getById(id);
    }
    @GetMapping("/tijdelijkepersonen/all")
    public Iterable<TijdelijkePersoon> getAlleTijdelijkePersonen() {
        return tijdelijkePersoonService.getallTijdelijkePersonen();
    }

    @DeleteMapping("/tijdelijkepersoon/delete/{id}")
    public void deleteTijdelijkePersoonById(@PathVariable(value = "id") long id){
         tijdelijkePersoonService.deleteTijdelijkePersoonById(id);
    }



}


