package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Employer;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Integer> {
    @Query("SELECT e FROM Employer e WHERE e.email = :email")
    Employer findByEmail(@Param("email") String email);
}
