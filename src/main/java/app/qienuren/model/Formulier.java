package app.qienuren.model;

import javax.persistence.*;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Formulier {

    //fields

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    private long maand;
    private long jaar;

    @ManyToOne
    private Persoon medewerker;
    private AdminStatus adminStatus = AdminStatus.OPEN;
    private OpdrachtgeverStatus opdrachtgeverStatus = OpdrachtgeverStatus.OPEN;

    @OneToMany(cascade = CascadeType.ALL)
    private List<WerkDag> werkDagen = new ArrayList<>();

    private boolean tijdelijkFormulier;
    private boolean ingezondenFormulier;

    public Formulier() {

    }

    public Formulier(long maand, long jaar) {
        this.setMaand(maand);
        this.setJaar(jaar);
        int aantalDagen = dagenInMaand(jaar, maand);
        for (int dag = 1; dag <= aantalDagen; dag++) {
            this.werkDagen.add(new WerkDag(jaar, maand, dag));
        }
        this.tijdelijkFormulier= true;
    }

    public int dagenInMaand(long jaar, long maand) {
        YearMonth yearMonthObject = YearMonth.of((int)jaar, (int)maand);;
        int daysInMonth = yearMonthObject.lengthOfMonth(); //28
        System.out.println(daysInMonth);

        return daysInMonth;
    }

    public AdminStatus getAdminStatus() {
        return adminStatus;
    }

    public void setAdminStatus(AdminStatus adminStatus) {
        this.adminStatus = adminStatus;
    }

    public OpdrachtgeverStatus getOpdrachtgeverStatus() {
        return opdrachtgeverStatus;
    }

    public void setOpdrachtgeverStatus(OpdrachtgeverStatus opdrachtgeverStatus) {
        this.opdrachtgeverStatus = opdrachtgeverStatus;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Persoon getMedewerker() {
        return medewerker;
    }

    public void setMedewerker(Persoon medewerker) {
        this.medewerker = medewerker;
    }

    public long getJaar() {
        return jaar;
    }

    public void setJaar(long jaar) {
        this.jaar = jaar;
    }

    public long getMaand() {
        return maand;
    }

    public void setMaand(long maand) {
        this.maand = maand;
    }

    public List<WerkDag> getWerkDagen() {
        return werkDagen;
    }

    public void setWerkDagen(List<WerkDag> werkDagen) {
        this.werkDagen = werkDagen;
    }

    public boolean isTijdelijkFormulier() {
        return tijdelijkFormulier;
    }

    public void setTijdelijkFormulier(boolean tijdelijkFormulier) {
        this.tijdelijkFormulier = tijdelijkFormulier;
    }

    public boolean isIngezondenFormulier() {
        return ingezondenFormulier;
    }

    public void setIngezondenFormulier(boolean ingezondenFormulier) {
        this.ingezondenFormulier = ingezondenFormulier;
    }



}

