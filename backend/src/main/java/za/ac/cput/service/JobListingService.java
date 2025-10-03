package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.JobListing;
import za.ac.cput.repository.JobListingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class JobListingService implements IJobListingService {

    private final JobListingRepository repository;

    @Autowired
    public JobListingService(JobListingRepository repository) {
        this.repository = repository;
    }

    @Override
    public JobListing create(JobListing jobListing) {
        return repository.save(jobListing);
    }

    @Override
    public Optional<JobListing> read(Long id) {
        return repository.findById(id);
    }

    @Override
    public JobListing update(JobListing jobListing) {
        if (jobListing.getId() != null && repository.existsById(jobListing.getId())) {
            return repository.save(jobListing);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<JobListing> getAll() {
        return repository.findAll();
    }

    public List<JobListing> getByEmployer(Integer employerId) {
        return repository.findByEmployer_EmployerID(employerId);
    }
}
