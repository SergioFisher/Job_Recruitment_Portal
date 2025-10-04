package za.ac.cput.service;

import za.ac.cput.domain.JobListing;
import java.util.List;
import java.util.Optional;

public interface IJobListingService {
    JobListing create(JobListing jobListing);
    Optional<JobListing> read(Long id);
    JobListing update(JobListing jobListing);
    void delete(Long id);
    List<JobListing> getAll();
}
