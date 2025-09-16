package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.JobListing;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.repository.JobListingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class JobListingService {

    private final JobListingRepository repository;

    public JobListingService(JobListingRepository repository) {
        this.repository = repository;
    }

    public JobListing create(JobListing jobListing) {
        return repository.save(jobListing);
    }

    public Optional<JobListing> read(Integer id) {
        return repository.findById(id);
    }

    public List<JobListing> findAll() {
        return repository.findAll();
    }

    public JobListing update(JobListing jobListing) {
        if (jobListing.getId() == null || !repository.existsById(jobListing.getId())) {
            throw new IllegalArgumentException("JobListing with ID " + jobListing.getId() + " does not exist.");
        }
        return repository.save(jobListing);
    }

    public boolean delete(Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<JobListing> getAll() {
        return repository.findAll();
    }

}
