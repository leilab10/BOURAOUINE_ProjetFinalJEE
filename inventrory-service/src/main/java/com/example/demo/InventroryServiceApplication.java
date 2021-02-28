package com.example.demo;

        import com.example.demo.entities.Product;
        import com.example.demo.repositories.ProductRepository;
        import org.springframework.boot.CommandLineRunner;
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.context.annotation.Bean;
        import org.springframework.data.rest.core.annotation.RepositoryRestResource;
        import org.springframework.data.rest.core.config.RepositoryRestConfiguration;


@SpringBootApplication
public class InventroryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventroryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository productRepository, RepositoryRestConfiguration restConfiguration){
        restConfiguration.exposeIdsFor(Product.class);
        return args -> {
            productRepository.save(new Product(null,"MacBook",18000));
            productRepository.save(new Product(null,"AirPods",2000));
            productRepository.save(new Product(null,"Smartphone",6000));
            productRepository.findAll().forEach(product -> {
                System.out.println(product.toString());
            });

        };
    }

}
