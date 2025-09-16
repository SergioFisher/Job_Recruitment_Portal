package za.ac.cput.repository;

import org.springframework.core.annotation.MergedAnnotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Employer;
import za.ac.cput.domain.JobListing;

import java.lang.annotation.Annotation;
import java.util.List;
import java.util.Optional;

@Repository
public interface JobListingRepository extends JpaRepository<JobListing, Integer> {

    Optional<JobListing> findByTitleAndEmployer(String title, Employer employer);
}
