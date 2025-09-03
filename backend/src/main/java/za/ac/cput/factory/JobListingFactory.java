package za.ac.cput.factory;

import za.ac.cput.domain.JobListing;

import java.time.LocalDate;

public class JobListingFactory {

    public static JobListing createJobListing(String title,
                                              String description,
                                              String location,
                                              String employmentType,
                                              LocalDate postedDate,
                                              String status) {

        // Basic validation
        if (title == null || title.isEmpty())
            throw new IllegalArgumentException("Title cannot be empty");
        if (description == null || description.isEmpty())
            throw new IllegalArgumentException("Description cannot be empty");
        if (location == null || location.isEmpty())
            throw new IllegalArgumentException("Location cannot be empty");
        if (employmentType == null || employmentType.isEmpty())
            throw new IllegalArgumentException("Employment type cannot be empty");
        if (postedDate == null)
            postedDate = LocalDate.now(); // default to today if not provided
        if (status == null || status.isEmpty())
            status = "OPEN";

        return new JobListing.Builder()
                .setTitle(title)
                .setDescription(description)
                .setLocation(location)
                .setEmploymentType(employmentType)
                .setPostedDate(postedDate)
                .setStatus(status)
                .build();
    }
}
