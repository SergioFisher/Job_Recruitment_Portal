package za.ac.cput.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import za.ac.cput.domain.Administrator;
import za.ac.cput.repository.AdministratorRepository;

@Component
@Order(1)
public class AdminData implements CommandLineRunner {

    private final AdministratorRepository administratorRepository;

    public AdminData(AdministratorRepository administratorRepository) {
        this.administratorRepository = administratorRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        String adminEmail = "admin@jobfinder.com";

        // Check if admin already exists by email
        Administrator existingAdmin = administratorRepository.findByEmail(adminEmail);

        if (existingAdmin == null) {

            Administrator admin = new Administrator.Builder()
                    .setName("SystemAdmin")
                    .setDeleteJobs(true)
                    .setEmail(adminEmail)
                    .setPassword("Admin@123")
                    .setRole("ADMIN")
                    .build();

            administratorRepository.save(admin);
            System.out.println("Admin seeded: " + admin);
        } else {
            System.out.println("Admin already exists: " + existingAdmin.getUserName());
        }
    }
}