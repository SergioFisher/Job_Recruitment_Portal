package za.ac.cput.service;

import za.ac.cput.domain.JobListing;

import java.util.List;
import java.util.Optional;

public interface IJobListingService {
    JobListing save(JobListing jobListing);
    Optional<JobListing> findById(Integer id);
    List<JobListing> findAll();
    JobListing update(JobListing jobListing);
    void deleteById(Integer id);

}

