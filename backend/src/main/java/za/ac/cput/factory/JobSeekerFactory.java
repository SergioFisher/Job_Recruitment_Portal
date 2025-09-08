package za.ac.cput.factory;

import za.ac.cput.domain.JobSeeker;

import java.time.LocalDate;

public class JobSeekerFactory {

    public static JobSeeker createJobSeeker(
            String email,
            String password,
            String fullName,
            String phoneNumber,
            LocalDate dateOfBirth,
            String resume,
            String location
    ) {
        // Basic validation
        if (email == null || email.isBlank())
            throw new IllegalArgumentException("Email is required.");
        if (password == null || password.isBlank())
            throw new IllegalArgumentException("Password is required.");
        if (fullName == null || fullName.isBlank())
            throw new IllegalArgumentException("Full name is required.");
        if (phoneNumber == null || phoneNumber.isBlank())
            throw new IllegalArgumentException("Phone number is required.");
        if (dateOfBirth == null)
            throw new IllegalArgumentException("Date of birth is required.");
        if (location == null || location.isBlank())
            throw new IllegalArgumentException("Location is required.");

        // Use Builder to create JobSeeker
        return new JobSeeker.Builder()
                .setEmail(email)
                .setPassword(password)
                .setFullName(fullName)
                .setPhoneNumber(phoneNumber)
                .setDateOfBirth(dateOfBirth)
                .setResume(resume)
                .setLocation(location)
                .build();
    }
}
