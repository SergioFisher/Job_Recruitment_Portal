package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Employer;
import za.ac.cput.factory.EmployerFactory;
import za.ac.cput.service.EmployerService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/jobRecruitmentPortal/employers")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployerController {

    @Autowired
    private EmployerService service;

    // CREATE
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Employer input) {
        try {
            // Use factory to create Employer
            Employer newEmployer = EmployerFactory.createEmployer(
                    input.getEmail(),
                    input.getPassword(),
                    input.getCompanyName(),
                    input.getIndustry(),
                    input.getWebsite(),
                    input.getLocation(),
                    input.getContactPerson()
            );

            Employer saved = service.create(newEmployer);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Employer Registered Successfully ✅");
            response.put("employer", saved);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Employer employer = service.findByEmail(email);

        if (employer != null && employer.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful ✅");
            response.put("id", employer.getEmployerID());  // ✅ FIXED
            response.put("email", employer.getEmail());
            response.put("companyName", employer.getCompanyName());
            response.put("role", employer.getRole());
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid email or password ❌");
    }



    // READ by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employer> getById(@PathVariable Integer id) {
        Employer employer = service.read(id);
        return employer != null ? ResponseEntity.ok(employer) : ResponseEntity.notFound().build();
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Employer>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Employer input) {
        Employer updated = service.update(id, input);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Employer Updated Successfully ");
        response.put("employer", updated);

        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Integer id) {
        boolean deleted = service.delete(id);
        Map<String, String> response = new HashMap<>();

        if (!deleted) {
            response.put("message", "Employer Not Found ");
            return ResponseEntity.status(404).body(response);
        }

        response.put("message", "Employer Deleted Successfully ");
        return ResponseEntity.ok(response);
    }
}
