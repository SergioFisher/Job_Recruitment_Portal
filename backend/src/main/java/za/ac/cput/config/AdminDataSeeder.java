package za.ac.cput.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import za.ac.cput.domain.Administrator;
import za.ac.cput.repository.AdministratorRepository;

@Component
public class AdminDataSeeder implements CommandLineRunner {

    private final AdministratorRepository repository;

    public AdminDataSeeder(AdministratorRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.findByEmailIgnoreCase("admin@jobfinder.com") == null) {
            Administrator admin = new Administrator.Builder()
                    .setEmail("admin@jobfinder.com")
                    .setPassword("Admin@123")
                    .setName("System Admin")
                    .setDeleteJobs(true)
                    .build();

            repository.save(admin);
            System.out.println("Default admin created: admin@jobfinder.com / Admin@123");
        } else {
            System.out.println("Admin already exists: admin@jobfinder.com");
        }
    }
}