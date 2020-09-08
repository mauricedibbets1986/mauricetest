package app.qienuren.rest;

import app.qienuren.controller.FormulierService;
import app.qienuren.controller.PersoonService;
import app.qienuren.model.Formulier;
import app.qienuren.model.Persoon;
import app.qienuren.model.Trainee;
import app.qienuren.model.WerkDag;
import com.opencsv.CSVWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/formulier")
public class FormulierEndpoint {

    @Autowired
    FormulierService formulierService;

    @Autowired
    PersoonService persoonService;

    @PostMapping("/nieuw")
    public Formulier nieuwFormulier(@RequestBody Formulier formulier) {

        /*System.out.println("<<<<<FORMULIER ID: " + formulier.getId() + ">>>>>");
        for (WerkDag w : formulier.getWerkDagen()) {
            System.out.println("Datum: " + w.getDatum());
            System.out.println("OpdrachtUren: " + w.getOpdrachtUren());
            System.out.println("OverwerkUren: " + w.getOverwerkUren());
            System.out.println("TrainingsUren: " + w.getTrainingsUren());
            System.out.println("VerlofUren: " + w.getVerlofUren());
            System.out.println("ZiekteUren: " + w.getZiekteUren());
            System.out.println("OverigeUren: " + w.getOverigeUren());
            System.out.println("OverigeUrenUitleg: " + w.getOverigeUrenUitleg());
        }*/

        return formulierService.addNieuwFormulier(formulier);
        //return null;
    }


    @GetMapping("/all")
    public Iterable<Formulier> alleFormulieren() {
        return formulierService.getalleFormulieren();
    }

    @GetMapping("/{id}")
    public Formulier getFormulierById(@PathVariable(value = "id") long id) {
        return formulierService.getById(id);
    }

    @DeleteMapping("/verwijderen/{id}")
    public void verwijderFormulier(@PathVariable(value = "id") long id) {
        formulierService.verwijderFormulier(id);
    }

    @GetMapping("/exportCSV/{formid}/{persoonid}")
    public void Export(@PathVariable(value = "formid") long formId, @PathVariable(value = "persoonid") long persoonId) {
        Formulier formulierExport = getFormulierById(formId);
        Persoon persoonExport = persoonService.getById(persoonId);
        try {
            formulierService.exportCSV(formulierExport, persoonExport);
            System.out.println("dit ging goed");
        } catch (IOException e) {
            System.out.println("er ging iets fout");
        }
    }

    @GetMapping("/export-users/{formid}/{persoonid}")
    public void exportCSV(@PathVariable(value = "formid") long formId, @PathVariable(value = "persoonid") long persoonId, HttpServletResponse response) throws Exception {
        Formulier formulierExport = getFormulierById(formId);
        Persoon persoonExport = persoonService.getById(persoonId);
        List<String[]> exportCSV = new ArrayList<>();
        try {
            exportCSV= formulierService.exportCSV(formulierExport, persoonExport);
            System.out.println("dit ging goed");
        } catch (IOException e) {
            System.out.println("er ging iets fout");
        }

        //set file name and content type
        String fileName = "Urenformulier-" + persoonExport.getNaam() + "-" + formulierExport.getMaand() + "-" + formulierExport.getJaar() +   ".csv";

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + fileName;

        response.setContentType("text/csv");
        response.setHeader(headerKey, headerValue);

        //create a csv writer
        CSVWriter writer = new CSVWriter(response.getWriter(), ';', '"', '\\', CSVWriter.DEFAULT_LINE_END);

        String[] header = new String[]{"datum", "opdracht", "overwerk", "verlof", "ziek", "training", "overig", "verklaring m.b.t. tot overig"};

        writer.writeAll(exportCSV);

        System.out.println("Writing CSV");

        writer.close();

    }

}
