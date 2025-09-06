package za.ac.cput.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Employer;
import za.ac.cput.service.EmployerService;

import java.util.List;

@RestController
@RequestMapping("/employers")
@CrossOrigin(origins = "http://localhost:5137")
public class EmployerController {

    @Autowired
    private EmployerService service;


    @PostMapping
    public ResponseEntity<Employer> create(@RequestBody Employer employer) {
        Employer created = service.save(employer);
        return ResponseEntity.ok(created);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Employer> read(@PathVariable Integer id) {
        return service.read(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Employer> update(@PathVariable Integer id, @RequestBody Employer updatedData) {
        return service.read(id)
                .map(existing -> {
                    Employer updatedEmployer = new Employer.Builder()
                            .copy(existing)
                            .setCompanyName(updatedData.getCompanyName())
                            .setIndustry(updatedData.getIndustry())
                            .setWebsite(updatedData.getWebsite())
                            .setLocation(updatedData.getLocation())
                            .setContactPerson(updatedData.getContactPerson())
                            .setJobListings(updatedData.getJobListings())
                            .build();

                    Employer result = service.update(updatedEmployer);
                    return ResponseEntity.ok(result);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("getAll")
    public ResponseEntity<List<Employer>> getAll() {
        List<Employer> all = service.getAll();
        return ResponseEntity.ok(all);
    }
}