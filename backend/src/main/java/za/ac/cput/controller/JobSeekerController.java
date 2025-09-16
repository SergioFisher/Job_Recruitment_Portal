package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.service.JobSeekerService;

import java.util.List;

@RestController
@RequestMapping("/jobseekers")
@CrossOrigin(origins = "http://localhost:3000")
public class JobSeekerController {

    @Autowired
    private JobSeekerService jobSeekerService;

    @PostMapping("/create")
    public ResponseEntity<JobSeeker> create(@RequestBody JobSeeker jobSeeker) {
        JobSeeker saved = jobSeekerService.create(jobSeeker);
        return ResponseEntity.ok(saved);
    }


    @GetMapping("/read/{id}")
    public ResponseEntity<JobSeeker> read(@PathVariable Integer id) {
        JobSeeker jobSeeker = jobSeekerService.read(id);
        return (jobSeeker != null) ? ResponseEntity.ok(jobSeeker) : ResponseEntity.notFound().build();
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<JobSeeker> update(@PathVariable Integer id, @RequestBody JobSeeker jobSeeker) {
        JobSeeker updated = jobSeekerService.update(id, jobSeeker);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        boolean deleted = jobSeekerService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


    @GetMapping("/getall")
    public ResponseEntity<List<JobSeeker>> getAll() {
        List<JobSeeker> jobSeekers = jobSeekerService.getAll();
        return ResponseEntity.ok(jobSeekers);
    }
}
