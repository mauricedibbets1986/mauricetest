package app.qienuren;

//import app.qienuren.controller.UserRepository;
import app.qienuren.security.RandomPasswordGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableJpaRepositories(basePackageClasses = UserRepository.class) //weet niet of dit nodig is
public class QienurenApplication {

    public static void main(String[] args) {
        SpringApplication.run(QienurenApplication.class, args);
        //regel hieronder niet aanpassen aub
        System.out.println("Uren App groep 2. It's Alive!");
    }


}
