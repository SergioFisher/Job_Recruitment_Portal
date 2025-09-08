package za.ac.cput.domain.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.factory.JobSeekerFactory;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class JobSeekerFactoryTest {

    @Test
    void testCreateJobSeekerSuccess() {
        JobSeeker jobSeeker = JobSeekerFactory.createJobSeeker(
                "sihle.m@gmail.com",
                "SecurePass123",
                "Sihle Mthembu",
                "0734567890",
                LocalDate.of(1999, 3, 15),
                "Experienced Java Developer",
                "Cape Town"
        );

        assertNotNull(jobSeeker);
        assertEquals("Sihle Mthembu", jobSeeker.getFullName());
        assertEquals("sihle.m@gmail.com", jobSeeker.getEmail());
        assertEquals("0734567890", jobSeeker.getPhoneNumber());
        assertEquals(LocalDate.of(1999, 3, 15), jobSeeker.getDateOfBirth());
        assertEquals("Cape Town", jobSeeker.getLocation());
    }

    @Test
    void testCreateJobSeekerMissingEmail() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            JobSeekerFactory.createJobSeeker(
                    "",
                    "SecurePass123",
                    "Sihle Mthembu",
                    "0734567890",
                    LocalDate.of(1999, 3, 15),
                    "Experienced Java Developer",
                    "Cape Town"
            );
        });

        assertEquals("Email is required.", exception.getMessage());
    }
}
