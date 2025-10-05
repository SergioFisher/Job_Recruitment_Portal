package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.JobSeeker;

@Repository
public interface JobSeekerRepository extends JpaRepository<JobSeeker, Integer> {
    @Query("SELECT j FROM JobSeeker j WHERE j.email = :email")
    JobSeeker findByEmail(@Param("email") String email);
}
