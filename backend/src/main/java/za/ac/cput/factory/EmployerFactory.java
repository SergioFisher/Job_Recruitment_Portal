package za.ac.cput.factory;

import za.ac.cput.domain.Employer;
import za.ac.cput.domain.JobListing;
import java.util.List;

public class EmployerFactory {

    public static Employer createEmployer(String email,
                                          String password,
                                          String companyName,
                                          String industry,
                                          String website,
                                          String location,
                                          String contactPerson,
                                          List<JobListing> jobListings) {

        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }
        if (companyName == null || companyName.isEmpty()) {
            throw new IllegalArgumentException("Company name is required");
        }
        if (industry == null || industry.isEmpty()) {
            throw new IllegalArgumentException("Industry is required");
        }

        // Call the superclass constructor to set inherited fields
        Employer employer = new Employer(email, password, "EMPLOYER");

        // Set subclass-specific fields using Builder
        employer = new Employer.Builder()
                .setCompanyName(companyName)
                .setIndustry(industry)
                .setWebsite(website)
                .setLocation(location)
                .setContactPerson(contactPerson)
                .setJobListings(jobListings)
                .build();

        return employer;
    }
}