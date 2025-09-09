package za.ac.cput.service;

import za.ac.cput.domain.JobSeeker;

import java.util.List;

public interface IJobSeekerService {
    JobSeeker create(JobSeeker jobSeeker);
    JobSeeker read(Integer id);
    JobSeeker update(Integer id, JobSeeker jobSeeker);
    boolean delete(Integer id);
    List<JobSeeker> getAll();
}
