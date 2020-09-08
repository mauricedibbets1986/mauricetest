package app.qienuren.rest;

import app.qienuren.controller.TijdelijkeTraineeService;
import app.qienuren.controller.TraineeService;
import app.qienuren.model.TijdelijkeTrainee;
import app.qienuren.controller.FormulierService;
import app.qienuren.model.Formulier;
import app.qienuren.model.Trainee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trainee")
public class TraineeEndpoint {

    @Autowired
    FormulierService formulierService;

    @Autowired
    TraineeService traineeService;

    @Autowired
    TijdelijkeTraineeService tijdelijkeTraineeService;

    @GetMapping("/{id}")
    public Trainee getTraineeById(@PathVariable(value = "id") long id) {
        return traineeService.getTraineeById(id);
    }

    @PutMapping("/trainee/koppelFormulier/{id}/{formulierid}")
    public void traineeKoppelFormulier(@PathVariable(value = "id") long traineeID, @PathVariable(value = "formulierid") long formulierid) {
        traineeService.traineeKoppelformulier(traineeID, formulierid);
    }

    @PostMapping("/nieuwegegevens/{id}")
    public TijdelijkeTrainee addTijdelijkeTrainee(@PathVariable(value = "id") long traineeID, @RequestBody TijdelijkeTrainee tijdtrainee) {
        return tijdelijkeTraineeService.addTijdelijkeTrainee(traineeID, tijdtrainee);
    }

    @GetMapping("/tijdelijketrainee/tijdelijketraineeid/{tijdelijketraineeid}")
    public TijdelijkeTrainee getTijdelijkeTraineeById(@PathVariable(value = "tijdelijketraineeid") long tijdelijkeTraineeId) {
        return tijdelijkeTraineeService.getTijdelijkeTraineeById(tijdelijkeTraineeId);
    }

    @GetMapping("/tijdelijketrainee/oorspronkelijketraineeid/{oorspronkelijketraineeid}")
    public TijdelijkeTrainee getTijdelijkeTraineeByOorspronkelijkeId(@PathVariable(value = "oorspronkelijketraineeid") long oorspronkelijkeId) {
        return tijdelijkeTraineeService.getTijdelijkeTraineByOorspronkelijkeId(oorspronkelijkeId);
    }

    @PutMapping("/formulier/update/{formulierid}")
    public Formulier updateFormulier(@RequestBody Formulier tf) {
        return formulierService.updateFormulier(tf);
    }

    @GetMapping("/tijdelijkeformulieren/{id}")
    public Iterable<Formulier> getTijdelijkeFormulierenByTraineeId(@PathVariable(value = "id") long id) {
        Trainee t = traineeService.getTraineeById(id);
        return t.getTijdelijkeFormulieren();
    }

    @GetMapping("/formulier/{traineeId}/{formulierId}")
    public Formulier getFormulier(@PathVariable(value = "traineeId") long traineeId, @PathVariable(value = "formulierId") long formulierId) {
        Trainee t = traineeService.getTraineeById(traineeId);
        Iterable<Formulier> formulieren = t.getTijdelijkeFormulieren();
        for (Formulier f : formulieren) {
            if (f.getId() == formulierId) {
                return f;
            }
        }
        return null;
    }

    @PutMapping("/wachtwoordwijzigen/{id}")
    public void traineeWachtwoordWijzigen(@RequestBody Trainee trainee, @PathVariable(value = "id") long traineeID) {
        traineeService.traineeWachtwoordWijzigen(traineeID,trainee);
    }

}
