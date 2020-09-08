package app.qienuren.rest;

import app.qienuren.controller.FormulierService;
import app.qienuren.controller.InterneMedewerkerService;
import app.qienuren.controller.TijdelijkeInterneMedewerkerService;
import app.qienuren.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/internemedewerker")
public class InterneMedewerkerEndpoint {


    @Autowired
    InterneMedewerkerService interneMedewerkerService;

    @Autowired
    FormulierService formulierService;

    @Autowired
    TijdelijkeInterneMedewerkerService tijdelijkeInterneMedewerkerService;

    @GetMapping("/{id}")
    public InterneMedewerker getInterneMedewerkerById(@PathVariable(value = "id") long id) {
        return interneMedewerkerService.getInterneMedewerkerById(id);
    }

    @GetMapping("/formulier/{medewerkerid}/{formulierId}")
    public Formulier getFormulier(@PathVariable(value = "medewerkerid") long medewerkerid, @PathVariable(value = "formulierId") long formulierId) {
        InterneMedewerker im = interneMedewerkerService.getInterneMedewerkerById(medewerkerid);
        Iterable<Formulier> formulieren = im.getTijdelijkeFormulieren();
        for (Formulier f : formulieren) {
            if (f.getId() == formulierId) {
                return f;
            }
        }
        return null;
    }
    @PutMapping("/wachtwoordwijzigen/{id}")
    public void internemedewerkerWachtwoordWijzigen(@RequestBody InterneMedewerker interneMedewerker, @PathVariable(value = "id") long id) {
        interneMedewerkerService.internemedewerkerWachtwoordWijzigen(id,interneMedewerker);
    }

    @PutMapping("/formulier/update/{formulierid}")
    public Formulier updateFormulier(@RequestBody Formulier tf) {
        return formulierService.updateFormulier(tf);
    }

    @PostMapping("/nieuwegegevens/{id}")
    public TijdelijkeInterneMedewerker addTijdelijkeMedewerker(@PathVariable(value = "id") long id, @RequestBody TijdelijkeInterneMedewerker medewerker) {
        return tijdelijkeInterneMedewerkerService.addTijdelijkeMedewerker(id, medewerker);
    }

    @GetMapping("/tijdelijkemedewerker/tijdelijkemedewerkerid/{tijdelijkemedewerkerid}")
    public TijdelijkeInterneMedewerker getTijdelijkeMedewerkerById(@PathVariable(value = "tijdelijkemedewerkerid") long id) {
        return tijdelijkeInterneMedewerkerService.getTijdelijkeMedewerkerById(id);
    }

    @GetMapping("/tijdelijkemedewerker/oorspronkelijkemedewerkerid/{oorspronkelijkemedewerkerid}")
    public TijdelijkeInterneMedewerker getTijdelijkeMedewerkerByOorspronkelijkeId(@PathVariable(value = "oorspronkelijkemedewerkerid") long id) {
        return tijdelijkeInterneMedewerkerService.getTijdelijkeMedewerkerByOorspronkelijkeId(id);
    }


}
