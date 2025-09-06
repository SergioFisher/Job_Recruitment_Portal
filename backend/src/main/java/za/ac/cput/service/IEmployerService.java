package za.ac.cput.service;


import za.ac.cput.domain.Employer;

import java.util.List;
import java.util.Optional;


public interface IEmployerService {

    Employer save(Employer employer);

    Optional<Employer> read(Integer id);

    Employer update(Employer employer);

    List<Employer> getAll();

}