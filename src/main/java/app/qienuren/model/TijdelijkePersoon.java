package app.qienuren.model;

import javax.persistence.*;

@Entity
public class TijdelijkePersoon{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String naam;

    @Column(name = "email")
    private String email;
    private String telefoonnr;
    private long oorspronkelijkeId;

    private String userName;// = email;
    private String password;
    private String straatNaamNr;
    private String postcode;
    private String woonplaats;

    private String roles; //later aanpassen enum(?)
    private boolean active;

    public long getOorspronkelijkeId() {
        return oorspronkelijkeId;
    }

    public void setOorspronkelijkeId(long oorspronkelijkeId) {
        this.oorspronkelijkeId = oorspronkelijkeId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String wachtwoord) {
        this.password = wachtwoord;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
        this.userName = email;
    }

    public String getTelefoonnr() {
        return telefoonnr;
    }

    public void setTelefoonnr(String telefoonnr) {
        this.telefoonnr = telefoonnr;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
}

