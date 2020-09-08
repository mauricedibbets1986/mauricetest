package app.qienuren.controller;

import app.qienuren.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableScheduling
@Service
@Transactional
public class MedewerkerService {

    @Autowired
    TraineeService ts;

    @Autowired
    InterneMedewerkerService ims;

    @Autowired
    FormulierService fs;

    @Autowired
    TraineeRepository traineeRepository;

    @Autowired
    MedewerkerRepository medewerkerRepository;

    @Autowired
    EmailService emailService;

    private List<Medewerker> medewerkers;
    private List<Trainee> trainees;
    private List<InterneMedewerker> interneMedewerkers;

    // lijst met medewerkers

    public ArrayList<Medewerker> voegTraineesEnInterneMedewerkersSamen() {
        medewerkers = new ArrayList<>();
        trainees = (List)ts.getAllTrainees();
        interneMedewerkers = (List)ims.getAllInterneMedewerkers();

        for (Trainee t : trainees) {
            medewerkers.add(t);
        }
        for (InterneMedewerker i : interneMedewerkers) {
            if (!(i.getType() == MedewerkerType.Admin)) {
                medewerkers.add(i);
            }
        }
        return (ArrayList<Medewerker>)medewerkers;
    }

    public void genereerLeegFormulier() {
        ArrayList<Medewerker> deMedewerkers = voegTraineesEnInterneMedewerkersSamen();
        for (Medewerker m : deMedewerkers) {
            m.voegFormulierToe(fs.addNieuwFormulier(new Formulier(LocalDate.now().getMonthValue(), LocalDate.now().getYear())));

            //Send email
            //Arguments: Medewerker, Subject, Message(templated?)
            //Medewerker fields nodig: Name, ?
            emailService.sendWithFormulierStaatKlaarTemplate(m);
        }
    }

  /*  @Scheduled(cron = "0 0/1 * 1/1 * ?")
    public void maakMaandelijksFormulier() {
        genereerLeegFormulier();

    }*/

    // Methode om op eerste van elke maand om 00:00u een formulier te genereren van de huidige maand
    @Scheduled(cron = "0 0 0 1 1/1 ?")
    public void maakMaandelijksFormulier() {
        genereerLeegFormulier();
    }

    public Medewerker getMedewerkerById(long id) {
        System.out.println("Medewerker opgehaald - test Maandag");
        return medewerkerRepository.findById(id).get();
    }

    // NA FEEDBACK PAUL(MAIL RINSE 26-08):
    // Methode om formulier van afgelopen maand niet langer invulbaar te maken na 1e week van nieuwe maand
/*    @Scheduled(cron = "0 0 0 8 1/1 ?")
    public void formulierVorigeMaandNietLangerInTeVullen() {

    }*/



}
