package com.project.fullstackbackend.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController
@RequestMapping("/tareas")
public class TareaController {
	
	@Autowired
	private TareaRepository tareaRepository;
	
	@GetMapping("")
	List<Tarea> index(){
		return tareaRepository.findAll();
	}
	
	@PostMapping("")
	Tarea create(@RequestBody Tarea tarea) {
		return tareaRepository.save(tarea);
	}
	
	@PutMapping("/{id}")
	Tarea update(@PathVariable Long id, @RequestBody Tarea tarea) {
		//Obtener la tarea que se quiere actualizar de la db
		Tarea tareaFromDb = tareaRepository
				.findById(id)
				.orElseThrow(RuntimeException::new);//Lanzar excepción si el objeto no es encontrdado en la db
		
		//Actualizar las propiedades de la tarea con los datos que obtenemos con el segundo parámetro (enviado por el usuario)
		tareaFromDb.setNombre(tarea.getNombre());
		tareaFromDb.setCompletado(tarea.isCompletado());
		
		//Actualizar la tarea con el método save
		return tareaRepository.save(tareaFromDb);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		Tarea tarea = tareaRepository
				.findById(id)
				.orElseThrow(RuntimeException::new);
		
		tareaRepository.delete(tarea);
	}
}
