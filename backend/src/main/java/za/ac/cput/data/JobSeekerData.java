package za.ac.cput.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.repository.JobSeekerRepository;
import java.time.LocalDate;

@Component
@Order(3)
public class JobSeekerData implements CommandLineRunner {
    private final JobSeekerRepository jobSeekerRepository;

    public JobSeekerData(JobSeekerRepository jobSeekerRepository) {
        this.jobSeekerRepository = jobSeekerRepository;
    }

    @Override
    public void run(String... args) {
        Object[][] seekers = {
                {"John Doe", "jobseeker1@example.com", "Cape Town"},
                {"Jane Smith", "jobseeker2@example.com", "Durban"},
                {"Peter Johnson", "jobseeker3@example.com", "Pretoria"}
        };

        for (Object[] data : seekers) {
            String name = (String) data[0];
            String email = (String) data[1];
            String location = (String) data[2];

            if (jobSeekerRepository.findByEmail(email) == null) {
                JobSeeker seeker = new JobSeeker.Builder()
                        .setFullName(name)
                        .setPhoneNumber("0820000000")
                        .setDateOfBirth(LocalDate.of(1995, 5, 20))
                        .setEmail(email)
                        .setPassword("Password123")
                        .setLocation(location)
                        .setRole("JOB_SEEKER")
                        .build();
                jobSeekerRepository.save(seeker);
                System.out.println("JobSeeker seeded: " + name);
            }
        }
    }
}