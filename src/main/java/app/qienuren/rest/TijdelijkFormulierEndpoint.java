//package app.qienuren.rest;
//
//import app.qienuren.controller.FormulierService;
//import app.qienuren.controller.TijdelijkFormulierService;
//import app.qienuren.model.Formulier;
//import app.qienuren.model.TijdelijkFormulier;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/tijdelijkformulier")
//public class TijdelijkFormulierEndpoint {
//
//    @Autowired
//    TijdelijkFormulierService tijdelijkFormulierService;
//
///*    @Autowired
//    MedewerkerService medewerkerService;*/
//
//    @PostMapping("/nieuw")
//    public TijdelijkFormulier nieuwTijdelijkFormulier(@RequestBody TijdelijkFormulier tf) {
//        return tijdelijkFormulierService.addNieuwTijdelijkFormulier(tf);
//    }
//
//    @GetMapping("/all")
//    public Iterable<TijdelijkFormulier> alleTijdelijkeFormulieren() {
//        return tijdelijkFormulierService.getalleTijdelijkeFormulieren();
//    }
//
//    @PutMapping("/update/{id}")
//    public TijdelijkFormulier updateTijdelijkFormulier(@RequestBody TijdelijkFormulier tf) {
//        return tijdelijkFormulierService.updateTijdelijkFormulier(tf);
//    }
//
//    @DeleteMapping("/verwijderen/{id}")
//    public void verwijderTijdelijkFormulier(@PathVariable(value = "id") long id) {
//        tijdelijkFormulierService.verwijderTijdelijkFormulier(id);
//    }
//
//}
