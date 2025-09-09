package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.repository.JobSeekerRepository;

import java.util.List;

@Service
public class JobSeekerService implements IJobSeekerService {

    @Autowired
    private JobSeekerRepository repository;

    public JobSeeker create(JobSeeker jobSeeker) {
        return repository.save(jobSeeker);
    }

    public JobSeeker read(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public JobSeeker update(Integer id, JobSeeker jobSeeker) {
        if (repository.existsById(id)) {
            jobSeeker = new JobSeeker.Builder()
                    .copy(jobSeeker)
                    .build();
            return repository.save(jobSeeker);
        }
        return null;
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
}
