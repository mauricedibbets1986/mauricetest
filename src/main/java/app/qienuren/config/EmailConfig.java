package app.qienuren.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;

@Configuration
public class EmailConfig {

    @Bean
    public SimpleMailMessage templateAccountAangemaakt(){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText("Beste %s\n\nMet vriendelijke groet,\nHR Qien");
        return message;
    }
}
