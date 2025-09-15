package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Application;
import za.ac.cput.repository.ApplicationRepository;

import java.util.List;


@Service
public class ApplicationService implements IApplicationService{


    private ApplicationRepository repository;

    @Autowired
    ApplicationService(ApplicationRepository repository){

        this.repository = repository;
    }


    @Override
    public Application create(Application application){

        return repository.save(application);
    }


    @Override
    public Application read(Integer id){

        return this.repository.findById(id).orElse(null);
    }


    @Override
    public Application update(Application application){

        return this.repository.save(application);
    }




    @Override
    public List<Application> getAll(){

        return this.repository.findAll();
    }



}
