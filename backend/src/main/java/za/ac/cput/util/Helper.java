package za.ac.cput.util;

import org.apache.commons.validator.routines.EmailValidator;
import za.ac.cput.domain.JobListing;
import za.ac.cput.domain.JobSeeker;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

public class Helper {

    public static boolean validateApplication(JobSeeker jobSeeker, JobListing jobListing, String coverLetter, LocalDate appliedDate, String status){


        // Check for null
        if (jobSeeker == null || jobListing == null ||
                coverLetter == null || appliedDate == null || status == null) {
            return false;
        }

        // Check that coverLetter is not empty
        if (coverLetter.trim().isEmpty()) {
            return false;
        }

        // Check that appliedDate is not in the future
        if (appliedDate.isAfter(LocalDate.now())) {
            return false;
        }

        // Check status is valid
        List<String> validStatuses = Arrays.asList("pending", "approved", "rejected");
        if (!validStatuses.contains(status.toLowerCase())) {
            return false;
        }

        // All checks passed
        return true;
    }





    public static boolean isValidEmail(String email){

        EmailValidator validator = EmailValidator.getInstance();

        if (validator.isValid(email)) {
            return true;
        } else {
            return false;
        }
    }

    public static LocalDate getDateApplied(String id){

        int year = Integer.parseInt(id.substring(0,2));
        int month = Integer.parseInt(id.substring(2,4));
        int day = Integer.parseInt(id.substring(4,6));

        LocalDate date = LocalDate.of(year,month,day);

        return date;

    }
}
