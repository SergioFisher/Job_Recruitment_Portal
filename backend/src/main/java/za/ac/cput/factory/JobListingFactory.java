package za.ac.cput.factory;

import za.ac.cput.domain.Employer;
import za.ac.cput.domain.JobListing;
import za.ac.cput.util.Helper;

public class JobListingFactory {

    public static JobListing buildJobListing(
            String title,
            String description,
            String location,
            String requirements,
            String salary,
            byte[] image,
            Employer employer
    ) {
        if (Helper.isNullorEmpty(title) || Helper.isNullorEmpty(description) || employer == null) {
            throw new IllegalArgumentException("Title, description and employer are required");
        }

        return new JobListing.Builder()
                .setTitle(title)
                .setDescription(description)
                .setLocation(location)
                .setRequirements(requirements)
                .setSalary(salary)
                .setImage(image)
                .setEmployer(employer)
                .build();
    }
}
