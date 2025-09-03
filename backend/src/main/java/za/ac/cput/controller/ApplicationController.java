package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Application;
import za.ac.cput.service.ApplicationService;

import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:5137")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    // CREATE
    @PostMapping
    public ResponseEntity<Application> create(@RequestBody Application application) {
        Application created = service.create(application);
        return ResponseEntity.ok(created);
    }

    // READ
    @GetMapping("/{id}")
    public ResponseEntity<Application> read(@PathVariable Integer id) {
        Application application = service.read(id);
        return application != null ? ResponseEntity.ok(application) : ResponseEntity.notFound().build();
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Application> update(@PathVariable Integer id, @RequestBody Application updatedData) {
        Application existing = service.read(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        // use Builder.copy() to update safely
        Application updatedApp = new Application.Builder()
                .copy(existing)
                .setCoverLetter(updatedData.getCoverLetter())
                .setStatus(updatedData.getStatus())
                .setAppliedDate(updatedData.getAppliedDate())
                .setJobSeeker(updatedData.getJobSeeker())
                .setJobListing(updatedData.getJobListing())
                .build();

        Application result = service.update(updatedApp);
        return ResponseEntity.ok(result);
    }

    // GET ALL
    @GetMapping("getAll")
    public ResponseEntity<List<Application>> getAll() {
        List<Application> all = service.getAll();
        return ResponseEntity.ok(all);
    }


    @Component
    public class TestDataRunner implements CommandLineRunner {

        private final ApplicationService applicationService;

        public TestDataRunner(ApplicationService applicationService) {
            this.applicationService = applicationService;
        }

        @Override
        public void run(String... args) throws Exception {
            System.out.println("Fetching all applications:");
            applicationService.getAll().forEach(System.out::println);
        }
    }
}