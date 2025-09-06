package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.Employer;
import za.ac.cput.repository.EmployerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployerService implements IEmployerService{

    private final EmployerRepository repository;

    public EmployerService(EmployerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Employer save(Employer employer) {
        return repository.save(employer);
    }

    @Override
    public Optional<Employer> read(Long id) {
        return repository.findById(id);
    }

    @Override
    public Employer update(Employer employer) {
        if (repository.existsById(employer.getEmployerID())) {
            return repository.save(employer);
        }
        throw new IllegalArgumentException("Employer with ID " + employer.getEmployerID() + " does not exist.");
    }

    @Override
    public List<Employer> getAll() {
        return repository.findAll();
    }
}
