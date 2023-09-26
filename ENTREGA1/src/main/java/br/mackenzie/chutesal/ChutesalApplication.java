package br.mackenzie.chutesal;

import br.mackenzie.chutesal.domain.usuario.UsuarioForm;
import br.mackenzie.chutesal.domain.usuario.service.UsuarioService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableFeignClients
public class ChutesalApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChutesalApplication.class, args);
    }

    /*@Bean
    CommandLineRunner run(UsuarioService userService) {
        return args -> {
            String username = "erickzorn";
            userService.create(new UsuarioForm(username, new BCryptPasswordEncoder().encode(username)));
        };
    }*/
}
