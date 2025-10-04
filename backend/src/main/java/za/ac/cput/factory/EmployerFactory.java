package za.ac.cput.factory;

import za.ac.cput.domain.Employer;

public class EmployerFactory {

    public static Employer createEmployer(
            String email,
            String password,
            String companyName,
            String industry,
            String website,
            String location,
            String contactPerson
    ) {
        // Basic validation
        if(email == null || email.isEmpty()) throw new IllegalArgumentException("Email is required");
        if(password == null || password.isEmpty()) throw new IllegalArgumentException("Password is required");
        if(companyName == null || companyName.isEmpty()) throw new IllegalArgumentException("Company name is required");

        // Build Employer object using Builder
        return new Employer.Builder()
                .setEmail(email)
                .setPassword(password)
                .setCompanyName(companyName)
                .setIndustry(industry)
                .setWebsite(website)
                .setLocation(location)
                .setContactPerson(contactPerson)
                .build();
    }
}
