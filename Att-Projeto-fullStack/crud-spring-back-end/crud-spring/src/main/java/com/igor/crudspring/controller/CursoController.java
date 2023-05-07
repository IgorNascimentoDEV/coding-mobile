package com.igor.crudspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.igor.crudspring.model.Curso;
import com.igor.crudspring.repository.CursoRepositorio;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CursoController {

	@Autowired
	private CursoRepositorio cursoRepositorio;

    
    @GetMapping
    public @ResponseBody List<Curso> list(){
        return cursoRepositorio.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> findById(@PathVariable("id") Long id){
        return cursoRepositorio.findById(id)
            .map(recordFound -> ResponseEntity.ok().body(recordFound))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Curso create(@RequestBody Curso curso){
        //System.out.println(curso.getName());
        return cursoRepositorio.save(curso);
        //return ResponseEntity.status(HttpStatus.CREATED).body(cursoRepositorio.save(curso));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Curso> update(@PathVariable("id") Long id, @RequestBody Curso curso){
        return cursoRepositorio.findById(id)
            .map(recordFound -> {
                recordFound.setName(curso.getName());
                recordFound.setCategory(curso.getCategory());
                Curso updated = cursoRepositorio.save(recordFound); 
                return ResponseEntity.ok().body(updated);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){
        return cursoRepositorio.findById(id)
            .map(recordFound -> {
               cursoRepositorio.deleteById(id);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
