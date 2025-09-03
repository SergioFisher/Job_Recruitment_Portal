package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.JobListing;

import java.util.List;

@Repository
public interface JobListingRepository extends JpaRepository<JobListing, Integer> {

}
