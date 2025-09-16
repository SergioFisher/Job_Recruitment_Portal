package za.ac.cput.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.JobListing;
import za.ac.cput.repository.JobListingRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/joblistings")
@CrossOrigin(origins = "http://localhost:3000")
public class JobListingController {

    private final JobListingRepository repository;

    public JobListingController(JobListingRepository repository) {
        this.repository = repository;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<JobListing> create(@RequestBody JobListing jobListing) {
        JobListing saved = repository.save(jobListing);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // READ (by id)
    @GetMapping("/{id}")
    public ResponseEntity<JobListing> read(@PathVariable Integer id) {
        Optional<JobListing> jobListing = repository.findById(id);
        return jobListing.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<JobListing> update(@PathVariable Integer id, @RequestBody JobListing jobListing) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        jobListing = new JobListing.Builder()
                .copy(jobListing)
                .setId(id)
                .build();

        JobListing updated = repository.save(jobListing);
        return ResponseEntity.ok(updated);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<JobListing>> getAll() {
        List<JobListing> jobListings = repository.findAll();
        return ResponseEntity.ok(jobListings);
    }
}
