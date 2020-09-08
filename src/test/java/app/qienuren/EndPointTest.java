package app.qienuren;

import app.qienuren.controller.TraineeRepository;
import app.qienuren.model.Trainee;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
public class EndPointTest {


    @Autowired
    private MockMvc mockMvc;


    @Autowired
    TraineeRepository traineeRepository;

    @Test
    public void shouldReturnDefaultMessage() throws Exception {
        Trainee trainee = new Trainee();
        trainee.setId(100);
        trainee.setNaam("mauricePO");

        traineeRepository.save(trainee);

        this.mockMvc.perform(get("/api/admin/trainee/all"))
                .andDo(print())
                .andExpect(status().isOk())
                //.andExpect(jsonPath("$.[0].naam", is("Rinse")))
                .andExpect(jsonPath("$.[0].naam", is("mauricePO")));
    }
}

