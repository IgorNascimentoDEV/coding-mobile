package com.igor.crudspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.igor.crudspring.model.Curso;

@Repository
public interface CursoRepositorio extends JpaRepository<Curso, Long>{
    
}
