package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.repository.JobSeekerRepository;

import java.util.List;

@Service
public class JobSeekerService {

    private final JobSeekerRepository repository;

    @Autowired
    public JobSeekerService(JobSeekerRepository repository) {
        this.repository = repository;
    }

    public JobSeeker create(JobSeeker jobSeeker) {
        return repository.save(jobSeeker);
    }

    public JobSeeker read(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public JobSeeker update(Integer id, JobSeeker jobSeeker) {
        return repository.findById(id).map(existing -> {
            JobSeeker updated = new JobSeeker.Builder()
                    .copy(jobSeeker)
                    .build();

            // Ensure same ID
            try {
                java.lang.reflect.Field field = JobSeeker.class.getDeclaredField("jobSeekerID");
                field.setAccessible(true);
                field.set(updated, id);
            } catch (Exception e) {
                throw new RuntimeException("Failed to set jobSeeker ID", e);
            }

            return repository.save(updated);
        }).orElse(null);
    }

    public boolean delete(Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<JobSeeker> getAll() {
        return repository.findAll();
    }

    // ✅ For login
    public JobSeeker findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
