package za.ac.cput.service;

import za.ac.cput.domain.Application;

import java.util.List;

public interface IApplicationService {
    Application create(Application application);

    Application read(Integer id);

    Application update(Application application);

    List<Application> getAll();
}
