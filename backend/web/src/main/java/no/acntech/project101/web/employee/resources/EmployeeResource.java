package no.acntech.project101.web.employee.resources;

import java.net.URI;
import java.time.LocalDate;
import java.util.*;

import no.acntech.project101.employee.service.EmployeeService;
import no.acntech.project101.web.employee.resources.converter.EmployeeConverter;
import no.acntech.project101.web.employee.resources.converter.EmployeeDtoConverter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponents;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
//TODO This is a REST controller and should receive request on path employees
@RestController
@RequestMapping("employees")
public class EmployeeResource {

    //TODO The constructor needs to accept the required dependencies and assign them to class variables
    /*
    private final EmployeeService employeeService;
    private final EmployeeDtoConverter employeeDtoConverter;
    private final EmployeeConverter employeeConverter;

    public EmployeeResource(final EmployeeService employeeService,
                            final EmployeeDtoConverter employeeDtoConverter,
                            final EmployeeConverter employeeConverter) {
        this.employeeService = employeeService;
        this.employeeDtoConverter = employeeDtoConverter;
        this.employeeConverter = employeeConverter;
    }
     */

    public EmployeeResource() {

    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> findAll() {
        //TODO create a GET endpoint find all employees in the database and return them
        EmployeeDto e = new EmployeeDto(1L, "Håkon", "Paulsen", LocalDate.now(), 123456789L);
        List<EmployeeDto> eList = new ArrayList<>();
        eList.add(e);
        return ResponseEntity.ok(eList);
    }

    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> findById(@PathVariable final Long id) {
        // TODO create a GET endpoint that fetches a spesific employee based on its ID
        EmployeeDto e = new EmployeeDto(id, "Håkon", "Paulsen", LocalDate.now(), 123456789L);
        return ResponseEntity.ok(e);
    }

    @PostMapping
    public ResponseEntity createEmployee(@Valid @RequestBody final EmployeeDto employeeDto) {
        //TODO Create a POST endpoint that accepts an employeeDTO and saves it in the database

        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(employeeDto.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteEmployee(@PathVariable final Long id) {
        // TODO Create a DELETE endpoint that deletes a specific employee
        return ResponseEntity.accepted().build();
    }

    @PatchMapping("{id}")
    public ResponseEntity updateEmployee(@PathVariable final Long id, @Valid @RequestBody final EmployeeDto employeeDto) {
        //TODO Create a PATCH endpoint that updates an employee with new values
        return ResponseEntity.ok(employeeDto);
    }
}
