package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.factory.JobSeekerFactory;
import za.ac.cput.service.JobSeekerService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/jobRecruitmentPortal/jobseekers")
@CrossOrigin(origins = "http://localhost:3000")
public class JobSeekerController {

    @Autowired
    private JobSeekerService jobSeekerService;

    // ✅ Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody JobSeeker input) {
        try {
            JobSeeker newJobSeeker = JobSeekerFactory.createJobSeeker(
                    input.getEmail(),
                    input.getPassword(),
                    input.getFullName(),
                    input.getPhoneNumber(),
                    input.getDateOfBirth(),
                    input.getResume(),
                    input.getLocation()
            );

            JobSeeker saved = jobSeekerService.create(newJobSeeker);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "JobSeeker Registered Successfully");
            response.put("jobSeeker", saved);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ Login
    @PostMapping("/login")
    public ResponseEntity<?> loginJobSeeker(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        JobSeeker jobSeeker = jobSeekerService.findByEmail(email);

        if (jobSeeker != null && jobSeeker.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "JobSeeker login successful ✅");
            response.put("jobSeekerId", jobSeeker.getId()); // ✅ use getId()
            response.put("role", "JOBSEEKER");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid credentials for jobseeker ❌");
    }

    // ✅ Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<JobSeeker> getById(@PathVariable Integer id) {
        JobSeeker js = jobSeekerService.read(id);
        if (js == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(js);
    }

    // ✅ Get all
    @GetMapping
    public ResponseEntity<List<JobSeeker>> getAll() {
        return ResponseEntity.ok(jobSeekerService.getAll());
    }

    // ✅ Update
    @PutMapping("/{id}")
    public ResponseEntity<JobSeeker> update(@PathVariable Integer id, @RequestBody JobSeeker input) {
        JobSeeker updated = jobSeekerService.update(id, input);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = jobSeekerService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("JobSeeker deleted successfully");
    }
}
