package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Administrator;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator,Integer> {


}
