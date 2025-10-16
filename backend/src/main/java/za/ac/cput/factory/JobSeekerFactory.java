package za.ac.cput.factory;

import za.ac.cput.domain.JobSeeker;

public class JobSeekerFactory {

    public static JobSeeker createJobSeeker(String email, String password, String fullName,
                                            String phoneNumber, long dateOfBirth,
                                            String resume, String location) {
        if (email == null || email.isBlank()) throw new IllegalArgumentException("Email required");
        if (password == null || password.isBlank()) throw new IllegalArgumentException("Password required");
        if (fullName == null || fullName.isBlank()) throw new IllegalArgumentException("Full name required");
        if (phoneNumber == null || phoneNumber.isBlank()) throw new IllegalArgumentException("Phone required");
        if (location == null || location.isBlank()) throw new IllegalArgumentException("Location required");

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
