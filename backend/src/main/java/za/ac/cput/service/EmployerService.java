package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Employer;
import za.ac.cput.repository.EmployerRepository;

import java.util.List;

@Service
public class EmployerService {

    private final EmployerRepository repository;

    @Autowired
    public EmployerService(EmployerRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Employer create(Employer employer) {
        return repository.save(employer);
    }

    // READ
    public Employer read(Integer id) {
        return repository.findById(id).orElse(null);
    }

    // UPDATE
    public Employer update(Integer id, Employer employer) {
        return repository.findById(id).map(existing -> {
            Employer updated = new Employer.Builder()
                    .setEmail(employer.getEmail())
                    .setPassword(employer.getPassword())
                    .setRole(existing.getRole()) // keep role consistent
                    .setCompanyName(employer.getCompanyName())
                    .setIndustry(employer.getIndustry())
                    .setWebsite(employer.getWebsite())
                    .setLocation(employer.getLocation())
                    .setContactPerson(employer.getContactPerson())
                    .build();

            // ✅ preserve same ID
            try {
                java.lang.reflect.Field field = Employer.class.getDeclaredField("employerID");
                field.setAccessible(true);
                field.set(updated, id);
            } catch (Exception e) {
                throw new RuntimeException("Failed to set employer ID", e);
            }

            return repository.save(updated);
        }).orElse(null);
    }

    // DELETE
    public boolean delete(Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    // GET ALL
    public List<Employer> getAll() {
        return repository.findAll();
    }

    // ✅ Needed for login
    public Employer findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
