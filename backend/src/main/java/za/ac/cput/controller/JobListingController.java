package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Employer;
import za.ac.cput.domain.JobListing;
import za.ac.cput.factory.JobListingFactory;
import za.ac.cput.service.EmployerService;
import za.ac.cput.service.JobListingService;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/job-listings")
public class JobListingController {

    private final JobListingService jobListingService;
    private final EmployerService employerService;

    @Autowired
    public JobListingController(JobListingService jobListingService, EmployerService employerService) {
        this.jobListingService = jobListingService;
        this.employerService = employerService;
    }

    // === CREATE JOB LISTING ===
    @PostMapping(value = "/create/{employerId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(
            @PathVariable Integer employerId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam("requirements") String requirements,
            @RequestParam("salary") String salary,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        try {
            Employer employer = employerService.read(employerId);
            if (employer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employer not found");
            }

            byte[] imageBytes = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                imageBytes = imageFile.getBytes();
            }

            JobListing jobListing = JobListingFactory.buildJobListing(
                    title, description, location, requirements, salary, imageBytes, employer
            );

            JobListing saved = jobListingService.create(jobListing);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Job listing created successfully ");
            response.put("jobListing", saved);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process image file.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // === GET ALL JOB LISTINGS ===
    @GetMapping("/all")
    public ResponseEntity<List<JobListing>> getAll() {
        return ResponseEntity.ok(jobListingService.getAll());
    }

    // === GET BY ID ===
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        Optional<JobListing> job = jobListingService.read(id);
        return job.<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // === UPDATE JOB LISTING ===
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody JobListing input
    ) {
        Optional<JobListing> existingOpt = jobListingService.read(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        JobListing existing = existingOpt.get();
        JobListing updated = new JobListing.Builder()
                .setId(existing.getId())
                .setTitle(input.getTitle())
                .setDescription(input.getDescription())
                .setLocation(input.getLocation())
                .setRequirements(input.getRequirements())
                .setSalary(input.getSalary())
                .setImage(input.getImage() != null ? input.getImage() : existing.getImage())
                .setEmployer(existing.getEmployer()) // employer stays the same
                .build();

        JobListing saved = jobListingService.update(updated);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Job listing updated successfully ");
        response.put("jobListing", saved);

        return ResponseEntity.ok(response);
    }

    // === DELETE JOB LISTING ===
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        Optional<JobListing> existing = jobListingService.read(id);
        Map<String, String> response = new HashMap<>();

        if (existing.isEmpty()) {
            response.put("message", "Job listing not found ");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        jobListingService.delete(id);
        response.put("message", "Job listing deleted successfully ");
        return ResponseEntity.ok(response);
    }

    // === GET JOB LISTING IMAGE ===
    @GetMapping("/media/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        Optional<JobListing> jobOpt = jobListingService.read(id);
        if (jobOpt.isEmpty()) return ResponseEntity.notFound().build();

        byte[] file = jobOpt.get().getImage();
        if (file == null) return ResponseEntity.notFound().build();

        HttpHeaders headers = new HttpHeaders();
        if (file.length > 4 && file[0] == (byte) 0xFF && file[1] == (byte) 0xD8) {
            headers.setContentType(MediaType.IMAGE_JPEG);
        } else if (file.length > 4 && file[0] == (byte) 0x89 && file[1] == (byte) 0x50) {
            headers.setContentType(MediaType.IMAGE_PNG);
        } else {
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        }

        return new ResponseEntity<>(file, headers, HttpStatus.OK);
    }

    // === PING ===
    @GetMapping("/ping")
    public String ping() {
        return "JobListing backend running ";
    }
}
