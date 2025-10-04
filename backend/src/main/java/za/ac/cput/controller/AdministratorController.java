package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Administrator;
import za.ac.cput.service.AdministratorService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/administrators")
@CrossOrigin(origins = "http://localhost:3000")
public class AdministratorController {

    private final AdministratorService service;

    @Autowired
    public AdministratorController(AdministratorService service) {
        this.service = service;
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Administrator administrator = service.findByEmail(email);

        if (administrator != null && administrator.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Administrator login successful ✅");
            response.put("administratorId", administrator.getAdministratorID());
            response.put("role", "ADMINISTRATOR");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password ❌");
    }


    // CREATE
    @PostMapping
    public ResponseEntity<Administrator> create(@RequestBody Administrator administrator) {
        return ResponseEntity.ok(service.create(administrator));
    }

    // READ
    @GetMapping("/{id}")
    public ResponseEntity<Administrator> read(@PathVariable Integer id) {
        Administrator administrator = service.read(id);
        return administrator != null ? ResponseEntity.ok(administrator) : ResponseEntity.notFound().build();
    }
    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Administrator updatedData) {
        Administrator existing = service.read(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        Administrator updated = new Administrator.Builder()
                .copy(existing)
                .setEmail(updatedData.getEmail())
                .setPassword(updatedData.getPassword())
                .setUserName(updatedData.getUserName())
                .build();

        // ✅ ensure ID is carried over
        updated = new Administrator.Builder()
                .copy(updated)
                .setAdministratorID(id)
                .build();

        Administrator result = service.update(updated); // now consistent
        return ResponseEntity.ok(result);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (service.delete(id)) {
            return ResponseEntity.ok("Administrator deleted successfully ✅");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Administrator not found ❌");
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Administrator>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // PING
    @GetMapping("/ping")
    public String ping() {
        return "Administrator backend running 🚀";
    }
}
