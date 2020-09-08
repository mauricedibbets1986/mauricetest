//package app.qienuren.controller;
//
//import app.qienuren.model.TijdelijkFormulier;
//import app.qienuren.model.WerkDag;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//import java.util.List;
//
//@Service
//@Transactional
//public class TijdelijkFormulierService {
//
//    @Autowired
//    TijdelijkFormulierRepository tijdelijkFormulierRepository;
//
//    public TijdelijkFormulier addNieuwTijdelijkFormulier(TijdelijkFormulier tf) {
//        System.out.println("Tijdelijk formulier aangemaakt");
//        return tijdelijkFormulierRepository.save(tf);
//    }
//
//    public Iterable<TijdelijkFormulier> getalleTijdelijkeFormulieren() {
//        return tijdelijkFormulierRepository.findAll();
//    }
//
///*    public Employee changeSalaryById(long id, Employee emp) {
//        System.out.println("Salaris veranderd!");
//        Employee employee = employeerepository.findById(id).get();
//
//        if(emp.getName() != null && emp.getName() != ""){
//            employee.setName(emp.getName());
//            System.out.println(emp.getName());
//        }
//
//        employee.setSalary(emp.getSalary());
//        return employeerepository.save(employee);
//    }*/
//
//    public TijdelijkFormulier updateTijdelijkFormulier(TijdelijkFormulier nieuwTf) {
//        // oude formulier ophalen
//        TijdelijkFormulier oudTf = tijdelijkFormulierRepository.findById(nieuwTf.getId()).get();
//
//        List<WerkDag> nieuweWerkDagen = nieuwTf.getWerkDagen();
//        List<WerkDag> oudeWerkDagen = oudTf.getWerkDagen();
//
//        for (int i = 0; i < nieuweWerkDagen.size(); i++) {
//            if (nieuweWerkDagen.get(i).getOpdrachtUren() != 0) {
//                oudeWerkDagen.get(i).setOpdrachtUren(nieuweWerkDagen.get(i).getOpdrachtUren());
//            }
//            if (nieuweWerkDagen.get(i).getOverwerkUren() != 0) {
//                oudeWerkDagen.get(i).setOverwerkUren(nieuweWerkDagen.get(i).getOverwerkUren());
//            }
//            if (nieuweWerkDagen.get(i).getVerlofUren() != 0) {
//                oudeWerkDagen.get(i).setVerlofUren(nieuweWerkDagen.get(i).getVerlofUren());
//            }
//            if (nieuweWerkDagen.get(i).getZiekteUren() != 0) {
//                oudeWerkDagen.get(i).setZiekteUren(nieuweWerkDagen.get(i).getZiekteUren());
//            }
//            if (nieuweWerkDagen.get(i).getTrainingsUren() != 0) {
//                oudeWerkDagen.get(i).setTrainingsUren(nieuweWerkDagen.get(i).getTrainingsUren());
//            }
//            if (nieuweWerkDagen.get(i).getOverigeUren() != 0) {
//                oudeWerkDagen.get(i).setOverigeUren(nieuweWerkDagen.get(i).getOverigeUren());
//            }
//            if (nieuweWerkDagen.get(i).getOverigeUrenUitleg() != "" || !(nieuweWerkDagen.get(i).getOverigeUrenUitleg().isEmpty())) {
//                oudeWerkDagen.get(i).setOverigeUrenUitleg(nieuweWerkDagen.get(i).getOverigeUrenUitleg());
//            }
//        }
//
//        System.out.println("Oud TF: " + oudTf.getWerkDagen().get(0).getOpdrachtUren());
//        System.out.println("nieuw TF: " + nieuwTf.getWerkDagen().get(0).getOpdrachtUren());
//        System.out.println("Oud F: " + oudTf.get);
//        return tijdelijkFormulierRepository.save(oudTf);
//    }
//
//    public void verwijderTijdelijkFormulier(long id) {
//        System.out.println("Het tijdelijke formulier is verwijderd");
//        tijdelijkFormulierRepository.deleteById(id);
//    }
//
//}
