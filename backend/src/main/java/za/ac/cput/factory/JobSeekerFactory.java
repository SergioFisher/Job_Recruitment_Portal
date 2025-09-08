package za.ac.cput.factory;

import za.ac.cput.domain.JobSeeker;

import java.time.LocalDate;

public class JobSeekerFactory {


    public static JobSeeker createJobSeeker(String email, String password, String fullName,
                                            String phoneNumber, LocalDate dateOfBirth,
                                            String resume, String location) {


        JobSeeker jobSeeker = new JobSeeker(email, password, "JOB_SEEKER");


        jobSeeker = new JobSeeker.Builder()
                .setEmail(email)
                .setPassword(password)
                .setFullName(fullName)
                .setPhoneNumber(phoneNumber)
                .setDateOfBirth(dateOfBirth)
                .setResume(resume)
                .setLocation(location)
                .build();

        return jobSeeker;
    }
}
