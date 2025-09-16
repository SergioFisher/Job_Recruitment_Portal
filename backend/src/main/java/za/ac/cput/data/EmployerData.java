package za.ac.cput.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import za.ac.cput.domain.Employer;
import za.ac.cput.repository.EmployerRepository;

@Component
@Order(2)
public class EmployerData implements CommandLineRunner {
    private final EmployerRepository employerRepository;

    public EmployerData(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

    @Override
    public void run(String... args) {
        String[][] employers = {
                {"Tech Corp", "employer1@example.com", "Cape Town"},
                {"Biz Solutions", "employer2@example.com", "Johannesburg"}
        };

        for (String[] data : employers) {
            String company = data[0], email = data[1], location = data[2];

            // Use Optional pattern to avoid null issues
            if (employerRepository.findByEmail(email) == null) {
                Employer employer = new Employer.Builder()
                        .setCompanyName(company)
                        .setEmail(email)
                        .setPassword("Password123")
                        .setLocation(location)
                        .setRole("EMPLOYER")
                        .build();

                // Save employer to get the ID generated
                employerRepository.save(employer);
                System.out.println("Employer seeded: " + company);
            }
        }
    }
}