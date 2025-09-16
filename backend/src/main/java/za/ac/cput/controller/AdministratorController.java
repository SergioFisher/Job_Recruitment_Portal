package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Administrator;
import za.ac.cput.domain.Employer;
import za.ac.cput.domain.JobListing;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.service.AdministratorService;
import za.ac.cput.service.EmployerService;
import za.ac.cput.service.JobListingService;
import za.ac.cput.service.JobSeekerService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/administrator")
@CrossOrigin(origins = "http://localhost:3000")
public class AdministratorController {



    @Autowired
    private AdministratorService service;



    @PostMapping("/login")
    public ResponseEntity<Administrator> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        System.out.println("Payload received: " + payload);

        System.out.println("Login attempt: [" + email + "] / [" + password + "]");

        Administrator administrator = service.findByEmail(email);

        if (administrator != null) {
            System.out.println("Found admin: " + administrator);
            if (administrator.getPassword().equals(password)) {
                System.out.println("Login success!");
                return ResponseEntity.ok(administrator);
            } else {
                System.out.println("Incorrect password");
            }
        } else {
            System.out.println("Admin not found");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


    // CREATE
    @PostMapping
    public ResponseEntity<Administrator> create(@RequestBody Administrator administrator) {
        Administrator created = service.create(administrator);
        return ResponseEntity.ok(created);
    }



    // READ
    @GetMapping("/{id}")
    public ResponseEntity<Administrator> read(@PathVariable Integer id) {
        Administrator administrator = service.read(id);
        return administrator != null ? ResponseEntity.ok(administrator) : ResponseEntity.notFound().build();
    }



    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Administrator> update(@PathVariable Integer id, @RequestBody Administrator updatedData) {
        Administrator existing = service.read(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        // use Builder.copy() to update safely
        Administrator updatedAdmin = new Administrator.Builder()
                .copy(existing)
                .setEmail(updatedData.getEmail())
                .setPassword(updatedData.getPassword())
                .setName(updatedData.getUserName())
                .setDeleteJobs(updatedData.isDeleteJobs())
                .build();

        Administrator result = service.update(updatedAdmin);
        return ResponseEntity.ok(result);
    }



    // GET ALL
    @GetMapping("getAll")
    public ResponseEntity<List<Administrator>> getAll() {
        List<Administrator> all = service.getAll();
        return ResponseEntity.ok(all);
    }




    @GetMapping("/ping")
    public String ping() {
        System.out.println("Ping received!");
        return "pong";
    }















    @Autowired
    private EmployerService employerService;

    @Autowired
    private JobSeekerService jobSeekerService;

    @Autowired
    private JobListingService jobListingService;

    // -------------------- EMPLOYERS --------------------
    @GetMapping("/employers")
    public ResponseEntity<List<Employer>> getAllEmployers() {
        return ResponseEntity.ok(employerService.getAll());
    }

    @PostMapping(value = "/employers", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Employer> createEmployer(@RequestBody Employer employer) {
        Employer saved = employerService.save(employer);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/employers/{id}")
    public ResponseEntity<Employer> updateEmployer(@PathVariable Integer id, @RequestBody Employer employer) {
        Optional<Employer> existing = employerService.read(id);
        if (existing.isPresent()) {
            Employer updated = employerService.update(
                    new Employer.Builder().copy(existing.get())
                            .setCompanyName(employer.getCompanyName())
                            .setEmail(employer.getEmail())
                            .setLocation(employer.getLocation())
                            .setIndustry(employer.getIndustry())
                            .setWebsite(employer.getWebsite())
                            .setRole(employer.getRole())
                            .build()
            );
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/employers/{id}")
    public ResponseEntity<Void> deleteEmployer(@PathVariable Integer id) {
        return employerService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // -------------------- JOB SEEKERS --------------------
    @GetMapping("/jobseekers")
    public ResponseEntity<List<JobSeeker>> getAllJobSeekers() {
        return ResponseEntity.ok(jobSeekerService.getAll());
    }

    @PostMapping("/jobseekers")
    public ResponseEntity<JobSeeker> createJobSeeker(@RequestBody JobSeeker jobSeeker) {
        return ResponseEntity.ok(jobSeekerService.create(jobSeeker));
    }

    @PutMapping("/jobseekers/{id}")
    public ResponseEntity<JobSeeker> updateJobSeeker(@PathVariable Integer id, @RequestBody JobSeeker jobSeeker) {
        JobSeeker updated = jobSeekerService.update(id, jobSeeker);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/jobseekers/{id}")
    public ResponseEntity<Void> deleteJobSeeker(@PathVariable Integer id) {
        return jobSeekerService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // -------------------- JOB LISTINGS --------------------
    @GetMapping("/jobs")
    public ResponseEntity<List<JobListing>> getAllJobs() {
        return ResponseEntity.ok(jobListingService.getAll());
    }

    @PostMapping("/jobs")
    public ResponseEntity<JobListing> createJob(@RequestBody JobListing jobListing) {
        return ResponseEntity.ok(jobListingService.create(jobListing));
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<JobListing> updateJob(@PathVariable Integer id, @RequestBody JobListing jobListing) {
        Optional<JobListing> existing = jobListingService.read(id);
        if (existing.isPresent()) {
            JobListing updated = jobListingService.update(
                    new JobListing.Builder().copy(existing.get())
                            .setTitle(jobListing.getTitle())
                            .setDescription(jobListing.getDescription())
                            .setLocation(jobListing.getLocation())
                            .setEmploymentType(jobListing.getEmploymentType())
                            .setStatus(jobListing.getStatus())
                            .setEmployer(jobListing.getEmployer())
                            .build()
            );
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Integer id) {
        return jobListingService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
  }

