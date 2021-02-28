package com.ctrl.microservices.demo;

import com.ctrl.microservices.demo.entities.Customer;
import com.ctrl.microservices.demo.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class BankCtrlApplication {
    public static void main(String[] args) {
        SpringApplication.run(BankCtrlApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CustomerRepository customerRepository, RepositoryRestConfiguration restConfiguration){
        restConfiguration.exposeIdsFor(Customer.class);
        return args -> {
            customerRepository.save(new Customer(null,"Leila","leila@gmail.com"));
            customerRepository.save(new Customer(null,"Bouraouine","bouraouine@gmail.com"));
            customerRepository.save(new Customer(null,"Alex","alex001@gmail.com"));
            customerRepository.save(new Customer(null,"Josh","josh123@gmail.com"));
            customerRepository.findAll().forEach(
                    customer -> {System.out.println(customer.toString());
                    });
        };
    }


}

