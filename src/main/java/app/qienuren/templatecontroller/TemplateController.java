package app.qienuren.templatecontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class TemplateController {

    @GetMapping("login")
    public String getLoginView(){
        return "login";
    }

    @GetMapping("inlogsucces")
    public String getSuccesLogin(){
        return "inlogsucces";
   }

    @GetMapping("admin")
    public String getAdminPage(){
       return "admin";
    }

    @GetMapping("trainee")
    public String getTraineePage(){
        return "trainee";
    }

    @GetMapping("traineeformulier")
    public String getTraineeFormulierPage() { return "traineeformulier"; }

    @GetMapping("opdrachtgever")
    public String getOpdrachtgeverPage() { return "opdrachtgever"; }

    @GetMapping("profielpagina")
    public String getProfielpagina() { return "profielpagina";}

    @GetMapping("profielpaginakcp")
    public String getProfielKCPpagina() { return "profielpaginakcp";}

    @GetMapping("profielpaginainternemw")
    public String getProfielinternemwpagina() { return "profielpaginainternemw";}

    @GetMapping("medewerker")
    public String getMedewerkerpagina() {return "medewerker"; }

    @GetMapping("medewerkerformulier")
    public String getMedewerkerformulierpagina() {return "medewerkerformulier"; }
}