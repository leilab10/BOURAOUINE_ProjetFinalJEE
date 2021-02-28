package com.example.demo.repositories;


import com.example.demo.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


@RepositoryRestResource
//@CrossOrigin("*")
public interface ProductRepository extends JpaRepository<Product, Long>{
}
