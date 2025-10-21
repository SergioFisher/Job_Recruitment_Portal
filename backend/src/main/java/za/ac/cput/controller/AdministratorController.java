package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Administrator;
import za.ac.cput.service.AdministratorService;


import java.util.List;
import java.util.Map;

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

}
