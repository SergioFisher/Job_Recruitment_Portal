package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Administrator;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator,Integer> {

    @Query("SELECT a FROM Administrator a WHERE a.email = :email")
    Administrator findByEmail(@Param("email") String email);


}
