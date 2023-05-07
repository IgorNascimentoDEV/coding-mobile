package com.igor.crudspring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.igor.crudspring.model.Curso;
import com.igor.crudspring.repository.CursoRepositorio;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CursoRepositorio cursoRepositorio){
		return args -> {
			cursoRepositorio.deleteAll();

			Curso c = new Curso();
			c.setName("Angular com Spring");
			c.setCategory("Front-end");

			cursoRepositorio.save(c);
		};
	}

}
