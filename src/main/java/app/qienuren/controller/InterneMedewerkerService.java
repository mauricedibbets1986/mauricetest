package app.qienuren.controller;

import app.qienuren.model.*;
import app.qienuren.security.RandomPasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

@Service
@Transactional
public class InterneMedewerkerService {

    @Autowired
    InterneMedewerkerRepository interneMedewerkerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    RandomPasswordGenerator randomPasswordGenerator;
    @Autowired
    EmailService emailService;
    @Autowired
    TijdelijkeInterneMedewerkerRepository tijdelijkeInterneMedewerkerRepository;

    public InterneMedewerker wijzigGegevens(long oorspronkelijkeId, long id) {
        System.out.println("Verzoek gegevens wijzigen ontvangen");
        //tijdelijke trainee wordt opgehaald
        TijdelijkeInterneMedewerker tijdelijkeInterneMedewerker = tijdelijkeInterneMedewerkerRepository.findById(id).get();
        //echte trainee wordt opgehaald
        InterneMedewerker interneMedewerker = interneMedewerkerRepository.findById(oorspronkelijkeId).get();

        System.out.println("voor: tijdTrainee>>> " + tijdelijkeInterneMedewerker.getNaam());
        System.out.println("voor: tijdTrainee>>> " + tijdelijkeInterneMedewerker.getTelefoonnr());

        System.out.println("voor: trainee>>> " + interneMedewerker.getNaam());
        System.out.println("voor: trainee>>> " + interneMedewerker.getTelefoonnr());

        //echte trainee krijgt waardes van de tijdelijke trainee, tenzij niets is ingevuld
        if (tijdelijkeInterneMedewerker.getNaam().isEmpty() | tijdelijkeInterneMedewerker.getNaam() ==  null) {
            interneMedewerker.setNaam(interneMedewerker.getNaam());
        } else {
            interneMedewerker.setNaam(tijdelijkeInterneMedewerker.getNaam());
        }
        if (tijdelijkeInterneMedewerker.getEmail().isEmpty() | tijdelijkeInterneMedewerker.getEmail() == null) {
            interneMedewerker.setEmail(interneMedewerker.getEmail());
        } else {
            interneMedewerker.setEmail(tijdelijkeInterneMedewerker.getEmail());

        }
        if (tijdelijkeInterneMedewerker.getTelefoonnr().isEmpty() | tijdelijkeInterneMedewerker.getTelefoonnr() == null) {
            interneMedewerker.setTelefoonnr(interneMedewerker.getTelefoonnr());
        } else {
            interneMedewerker.setTelefoonnr(tijdelijkeInterneMedewerker.getTelefoonnr());

        } if (tijdelijkeInterneMedewerker.getPostcode().isEmpty() | tijdelijkeInterneMedewerker.getPostcode() == null)  {
            interneMedewerker.setPostcode(interneMedewerker.getPostcode());
        } else {
            interneMedewerker.setPostcode(tijdelijkeInterneMedewerker.getPostcode());

        }
        if (tijdelijkeInterneMedewerker.getStraatNaamNr().isEmpty() | tijdelijkeInterneMedewerker.getStraatNaamNr() == null) {
            interneMedewerker.setStraatNaamNr(tijdelijkeInterneMedewerker.getStraatNaamNr());
        } else {
            interneMedewerker.setStraatNaamNr(tijdelijkeInterneMedewerker.getStraatNaamNr());

        }
        if (tijdelijkeInterneMedewerker.getWoonplaats().isEmpty() | tijdelijkeInterneMedewerker.getWoonplaats() == null) {
            interneMedewerker.setWoonplaats(interneMedewerker.getWoonplaats());
        } else {
            interneMedewerker.setWoonplaats(tijdelijkeInterneMedewerker.getWoonplaats());
        }

        System.out.println("na: tijdTrainee>>> " + tijdelijkeInterneMedewerker.getNaam());
        System.out.println("na: tijdTrainee>>> " + tijdelijkeInterneMedewerker.getTelefoonnr());

        System.out.println("na: trainee>>> " + interneMedewerker.getNaam());
        System.out.println("na: trainee>>> " + interneMedewerker.getTelefoonnr());

        //aangepaste gegevens worden opgeslagen in de database
        return interneMedewerkerRepository.save(interneMedewerker);
    }



    public InterneMedewerker addInterneMederwerker(InterneMedewerker interneMedewerker) {
        if (interneMedewerkerRepository.findByEmail(interneMedewerker.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "email bestaat al");
        }
        interneMedewerker.setPassword(randomPasswordGenerator.generatePassayPassword());
        String nonEncodedPassword = interneMedewerker.getPassword();
        System.out.println(interneMedewerker.getPassword());
        interneMedewerker.setPassword(passwordEncoder.encode(interneMedewerker.getPassword()));
        System.out.println(interneMedewerker.getPassword());
        System.out.println("Interne medewerker aangemaakt");

        //Send email
        //Arguments: InterneMedewerker, Subject, Message(templated?)
        //InterneMedewerker fields nodig: Name, Username, Password
        emailService.sendWithAccountTemplate(interneMedewerker, nonEncodedPassword);

        return interneMedewerkerRepository.save(interneMedewerker);
    }

    public Iterable<InterneMedewerker> getAllInterneMedewerkers() {
        System.out.println("Alle interne medewerkers opgevraagd");
        return interneMedewerkerRepository.findAll();
    }

    public InterneMedewerker getInterneMedewerkerById(long id) {
        System.out.println("Interne medewerker opgehaald");
        return interneMedewerkerRepository.findById(id).get();
    }


    public InterneMedewerker internemedewerkerWachtwoordWijzigen(long id, InterneMedewerker interneMedewerker) {
        InterneMedewerker interneMedewerker1 = interneMedewerkerRepository.findById(id).get();
        if(interneMedewerker.getPassword() != null && !interneMedewerker.getPassword().equals("")){
            interneMedewerker1.setPassword(passwordEncoder.encode(interneMedewerker.getPassword()));
        }
        return interneMedewerkerRepository.save(interneMedewerker1);
    }


}