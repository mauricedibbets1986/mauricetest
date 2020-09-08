package app.qienuren.controller;

import app.qienuren.model.AdminStatus;
import app.qienuren.model.Medewerker;
import app.qienuren.model.OpdrachtgeverStatus;
import app.qienuren.model.Persoon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class EmailService {

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    public SimpleMailMessage template;

    //Send Simple Message met Template => Template in MailConfig
    public void sendWithAccountTemplate(Persoon ontvanger, String password){
        String emailMessage = ontvanger.getNaam()+
                ",\n\nUw account waarmee u kunt inloggen op onze uren registratie app is aangemaakt met de volgende credentials:" +
                "\n\nGebruikersnaam: " + ontvanger.getUserName() + "\nWachtwoord: " + password;
        String email = String.format(template.getText(), emailMessage);
        String subject = "Uw Qien account is aangemaakt";
        sendEmail(ontvanger, subject, email);
    }

    public void sendWithFormulierStaatKlaarTemplate(Medewerker ontvanger){
        String emailMessage = ontvanger.getNaam() +
                ",\n\nUw urenformulier voor deze maand staat klaar in uw account." +
                "\nWij verzoeken u deze op de laatste werkdag van de maand op te sturen.";
        String subject = "Urenformulier Staat Klaar";

        String email = String.format(template.getText(), emailMessage);
        sendEmail(ontvanger, subject, email);
    }

    public void sendWithFormulierBeoordelingTemplate(Persoon ontvanger, AdminStatus beoordeling){
        String emailMessage = ontvanger.getNaam() + ",\n\n";
        String subject = "Uw formulier is ";
        if(beoordeling == AdminStatus.GOEDGEKEURD){
            emailMessage += "Uw formulier voor deze maand is door uw HR Admin goedgekeurd! Koekje voor jou!";
            subject += beoordeling + "";
        }else if(beoordeling == AdminStatus.AFGEKEURD){
            emailMessage += "Uw formulier voor deze maand is door uw HR Admin afgekeurd! Foei!";
            subject += beoordeling + "\uD83D\uDE02";
        }
        System.out.println(beoordeling);


        String email = String.format(template.getText(), emailMessage);
        System.out.println(emailMessage);
        sendEmail(ontvanger, subject, email);
    }

    public void sendWithFormulierBeoordelingTemplate(Persoon ontvanger, OpdrachtgeverStatus beoordeling){
        String emailMessage = ontvanger.getNaam() + ",\n\n";

        if(beoordeling == OpdrachtgeverStatus.GOEDGEKEURD){
            emailMessage += "Uw formulier voor deze maand is door uw opdrachtgever goedgekeurd! Lekker bezig!";
        }else if(beoordeling == OpdrachtgeverStatus.AFGEKEURD){
            emailMessage += "Uw formulier voor deze maand is door uw opdrachtgever afgekeurd! Oef!";
        }
        System.out.println(beoordeling);
        String subject = "Uw formulier is " + beoordeling;

        String email = String.format(template.getText(), emailMessage);
        System.out.println(emailMessage);
        sendEmail(ontvanger, subject, email);
    }

    public void sendEmail(Persoon ontvanger, String subject, String message) throws MailException {
        //Models a simple mail message, including data such as the from, to, cc, subject, and text fields.
        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(ontvanger.getEmail());
        mail.setFrom("qienrwtest@gmail.com");
        mail.setSubject(subject);
        mail.setText(message);

        javaMailSender.send(mail);
    }


}
