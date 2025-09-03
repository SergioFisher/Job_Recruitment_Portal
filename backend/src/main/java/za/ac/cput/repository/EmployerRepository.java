package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Employer;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
}