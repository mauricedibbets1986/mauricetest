package app.qienuren.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class KlantContactPersoon extends Persoon {

    private MedewerkerType type = null;

    @ManyToOne
    /*@JsonManagedReference(value = "bedrijf")*/
    private Bedrijf bedrijf;

    //Een Contactpersoon kan meerdere trainees onder zich hebben
    @OneToMany(cascade = CascadeType.ALL)
    @JsonBackReference(value="KCP")
    private List<Trainee> trainees = new ArrayList<>();

    public KlantContactPersoon() {
        this.setRoles("ROLE_KCP");
        this.setActive(true);
    }

    //@JsonIgnore
    public Bedrijf getBedrijf() {
        return bedrijf;
    }

    public void setBedrijf(Bedrijf bedrijf) {
        this.bedrijf = bedrijf;
    }

   // @JsonIgnore
    public List<Trainee> getTrainees() {
        return trainees;
    }

    public void setTrainees(List<Trainee> trainees) {
        this.trainees = trainees;
    }

    public void koppelBedrijf(Bedrijf bedrijf) {
        this.bedrijf = bedrijf;
    }

    public void koppelTrainee(Trainee trainee) {
        this.trainees.add(trainee);
    }
}