package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,Integer> {

}
