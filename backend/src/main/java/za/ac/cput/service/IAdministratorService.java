package za.ac.cput.service;

import za.ac.cput.domain.Administrator;
import za.ac.cput.domain.Application;

import java.util.List;

public interface IAdministratorService {

    Administrator create(Administrator administrator);

    Administrator read(Integer id);

    Administrator update(Administrator administrator);


    boolean delete(Integer id);

    List<Administrator> getAll();
}
