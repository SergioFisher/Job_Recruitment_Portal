//package za.ac.cput.data;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//import za.ac.cput.domain.Employer;
//import za.ac.cput.domain.JobListing;
//import za.ac.cput.repository.EmployerRepository;
//import za.ac.cput.repository.JobListingRepository;
//
//import java.time.LocalDate;
//
//@Component
//@Order(4)
//public class JobListingData implements CommandLineRunner {
//    private final JobListingRepository jobListingRepository;
//    private final EmployerRepository employerRepository;
//
//    public JobListingData(JobListingRepository jobListingRepository, EmployerRepository employerRepository) {
//        this.jobListingRepository = jobListingRepository;
//        this.employerRepository = employerRepository;
//    }
//
//    @Override
//    public void run(String... args) {
//        Employer employer1 = employerRepository.findByEmail("employer1@example.com");
//        Employer employer2 = employerRepository.findByEmail("employer2@example.com");
//
//        // Seed jobs for employer1 if not already present
//        if (employer1 != null && jobListingRepository.count() == 0) {
//            JobListing job1 = new JobListing.Builder()
//                    .setTitle("Software Developer")
//                    .setDescription("Build and maintain web applications")
//                    .setLocation("Cape Town")
//                    .setEmploymentType("Full-time")
//                    .setStatus("Active")
//                    .setPostedDate(LocalDate.now())
//                    .setEmployer(employer1)
//                    .build();
//
//            JobListing job2 = new JobListing.Builder()
//                    .setTitle("System Analyst")
//                    .setDescription("Analyse requirements and improve IT systems")
//                    .setLocation("Cape Town")
//                    .setEmploymentType("Contract")
//                    .setStatus("Active")
//                    .setPostedDate(LocalDate.now())
//                    .setEmployer(employer1)
//                    .build();
//
//            jobListingRepository.save(job1);
//            jobListingRepository.save(job2);
//            System.out.println("Jobs seeded for " + employer1.getCompanyName());
//        }
//
//        // Seed jobs for employer2
//        if (employer2 != null) {
//            // Check by title and employer instead of ID
//            boolean jobExists = jobListingRepository
//                    .findByTitleAndEmployer("Network Engineer", employer2)
//                    .isPresent();
//
//            if (!jobExists) {
//                JobListing job3 = new JobListing.Builder()
//                        .setTitle("Network Engineer")
//                        .setDescription("Manage and secure company networks")
//                        .setLocation("Johannesburg")
//                        .setEmploymentType("Part-time")
//                        .setStatus("Closed")
//                        .setPostedDate(LocalDate.now())
//                        .setEmployer(employer2)
//                        .build();
//
//                jobListingRepository.save(job3);
//                System.out.println("Job seeded for " + employer2.getCompanyName());
//            }
//        }
//    }
//}
