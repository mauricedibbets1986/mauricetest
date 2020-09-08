package app.qienuren.model;

import javax.persistence.*;
import java.util.List;

//aparte klasse voor tijdelijke trainee, extend klasse persoon niet. Dit is omdat anders de tijdelijke trainee
// aan de database als persoon wordt toegevoegd en dit is niet wat we willen.


@Entity
public class TijdelijkeTrainee extends TijdelijkePersoon{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long oorspronkelijkeId; //id van de daadwerkelijke trainee.
    private String naam;
    private String email;
    private String telefoonnr;
    private String userName;// = email;
    private String password;

    private String straatNaamNr;

    private String postcode;
    private String woonplaats;

    @OneToMany
    private List<TijdelijkeTrainee> tijdelijkeTrainees;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public long getOorspronkelijkeId() {
        return oorspronkelijkeId;
    }

    public void setOorspronkelijkeId(long oorspronkelijkeId) {
        this.oorspronkelijkeId = oorspronkelijkeId;
    }

    public String getNaam() {
        return naam;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefoonnr() {
        return telefoonnr;
    }

    public void setTelefoonnr(String telefoonnr) {
        this.telefoonnr = telefoonnr;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getStraatNaamNr() {
        return straatNaamNr;
    }

    public void setStraatNaamNr(String straatNaamNr) {
        this.straatNaamNr = straatNaamNr;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getWoonplaats() {
        return woonplaats;
    }

    public void setWoonplaats(String woonplaats) {
        this.woonplaats = woonplaats;
    }

    public List<TijdelijkeTrainee> getAllTijdelijkeTrainee() {
        return tijdelijkeTrainees;
    }

    public void setTijdelijkeTrainees(List<TijdelijkeTrainee> tijdelijkeTrainees) {
        this.tijdelijkeTrainees = tijdelijkeTrainees;
    }

}
