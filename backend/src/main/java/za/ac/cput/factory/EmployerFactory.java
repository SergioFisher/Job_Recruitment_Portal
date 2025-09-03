package za.ac.cput.factory;

import za.ac.cput.domain.Employer;
import za.ac.cput.domain.JobListing;
import java.util.List;

public class EmployerFactory {

        public static Employer createEmployer( Long employerID,
                                               String companyName,
                                               String industry,
                                               String website,
                                               String location,
                                               String contactPerson,
                                               List<JobListing> jobListings)
           {

            if (companyName == null || companyName.isEmpty()) {
                throw new IllegalArgumentException("Company name is required");
            }
            if (industry == null || industry.isEmpty()) {
                throw new IllegalArgumentException("Industry is required");
            }

            return new Employer.Builder()
                    .setEmployerID(employerID)
                    .setCompanyName(companyName)
                    .setIndustry(industry)
                    .setWebsite(website)
                    .setLocation(location)
                    .setContactPerson(contactPerson)
                    .setJobListings(jobListings)
                    .build();
        }
}
