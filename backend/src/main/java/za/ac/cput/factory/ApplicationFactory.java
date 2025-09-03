package za.ac.cput.factory;

import za.ac.cput.domain.Application;
import za.ac.cput.domain.JobListing;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.util.Helper;

import java.time.LocalDate;

public class ApplicationFactory {

    public static Application createApplication(JobSeeker jobSeeker, JobListing jobListing, String coverLetter, LocalDate appliedDate, String status){

        Helper.validateApplication(jobSeeker,jobListing,coverLetter,appliedDate,status);



        return new Application.Builder()
                .setJobSeeker(jobSeeker)
                .setJobListing(jobListing)
                .setCoverLetter(coverLetter)
                .setAppliedDate(appliedDate)
                .setStatus(status)
                .build();

    }


}

