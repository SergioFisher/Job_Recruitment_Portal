package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Administrator;
import za.ac.cput.repository.AdministratorRepository;

import java.util.List;

@Service
public class AdministratorService implements IAdministratorService {

    private final AdministratorRepository repository;

    @Autowired
    public AdministratorService(AdministratorRepository repository) {
        this.repository = repository;
    }

    public Administrator create(Administrator administrator) {
        if (repository.findByEmailIgnoreCase(administrator.getEmail()) != null) {
            throw new IllegalArgumentException("Administrator with this email already exists.");
        }
        return repository.save(administrator);
    }

    @Override
    public Administrator read(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Administrator update(Administrator administrator) {
        return repository.save(administrator);
    }

    @Override
    public boolean delete(Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public Administrator findByEmail(String email) {
        if (email == null) return null;
        return repository.findByEmailIgnoreCase(email.trim());
    }

    @Override
    public List<Administrator> getAll() {
        return repository.findAll();
    }
}