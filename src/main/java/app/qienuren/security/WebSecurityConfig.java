package app.qienuren.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.sql.DataSource;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Qualifier("myUserDetailsService")
    @Autowired
    UserDetailsService userDetailsService;

    @Bean
    public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
        return new MyAuthenticationSuccessHandler();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(userDetailsService);


//        auth.inMemoryAuthentication()
//                .withUser("lala")
//                .password("lala")
//                .roles("USER")
//                .and()
//                .withUser("zozo")
//                .password("zozo")
//                .roles("ADMIN");
    }

//


//    @Bean
//    public PasswordEncoder getPasswordEncoder() {
//        return NoOpPasswordEncoder.getInstance();
//    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

   @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
       auth.setUserDetailsService(userDetailsService);
        auth.setPasswordEncoder(passwordEncoder());
       return auth;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/admin").hasRole("ADMIN")
                .antMatchers("/trainee").hasAnyRole("TRAINEE", "ADMIN")
                .antMatchers("/medewerker").hasAnyRole( "ADMIN", "INTERNEMEDEWERKER")
                .antMatchers("/opdrachtgever").hasRole("KCP")
                .antMatchers("/traineeformulier").hasAnyRole("TRAINEE", "ADMIN")
                .antMatchers("/medewerkerformulier").hasAnyRole("INTERNEMEDEWERKER", "ADMIN")
                .antMatchers("/profielpagina").hasAnyRole("TRAINEE", "ADMIN")
                .antMatchers("/profielpaginaKCP").hasAnyRole("KCP", "ADMIN")
                .antMatchers("/profielpaginainternemw").hasAnyRole("INTERNEMEDEWERKER", "ADMIN")
                //.antMatchers("/user**").hasAnyRole("USER", "ADMIN")
                .antMatchers("/api/**").permitAll()

                .antMatchers("/js/**", "/css/**", "/img/**").permitAll()

                .antMatchers("/").permitAll()


                //.antMatchers("/admin").hasRole("ADMIN") alleen admin heeft toegang tot /admin pagina's "ROLE_ADMIN"
                //.antMatchers("/trainee").hasRole("TRAINEE") alleen trainee's hebben toegang tot /traine pagina's "ROLE_TRAINEE"

                //.antMatchers("/intermedewerker").hasRole("INTERNEMEDEWERKER") ROLE_INTERNEMEDEWERKE
                .and()
                .formLogin()
                .loginPage("/login").permitAll()
                .successHandler(myAuthenticationSuccessHandler())//dit zorgt ervoor dat de login pagina aangepast kan worden en laat login.html zien (zie templates)
                //.defaultSuccessUrl("/inlogsucces",true)

                .and()

                .logout() //dit gedeelte zorgt voor een logout, en verwijdert cookies, je komt weer terecht op login pagina
                .logoutUrl("/logout")

                .logoutSuccessUrl("/login");
        http.csrf().disable();

    }
}
//                .loginPage("/login").permitAll() //dit zorgt ervoor dat de login pagina aangepast kan worden en laat login.html zien (zie templates)
//                .defaultSuccessUrl("/inlogsucces",true) //dit zorgt ervoor na het inloggen// dat je op deze pagina terecht komt, zie html in map templates en de getmapping in templatecontroller
//                .passwordParameter("password") //moet hetzelfde zijn als name in login.html
//                .usernameParameter("username")
//
//                .and()
//
//                .rememberMe() //zodat de gebruiker onthouden wordt (staat default op 2 weken)
//                .rememberMeParameter("remember-me")// -->userdetailservice nog implementeren anders werkt dit niet
//
//                .and()
//
//                .logout() //dit gedeelte zorgt voor een logout, en verwijdert cookies, je komt weer terecht op login pagina
//                .logoutUrl("/logout")
//                .clearAuthentication(true)
//                .invalidateHttpSession(true)
//                .deleteCookies("JSESSIONID", "remember-me")
//                .logoutSuccessUrl("/login");
//    }




