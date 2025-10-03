package za.ac.cput.util;

import org.apache.commons.validator.routines.EmailValidator;
import za.ac.cput.domain.JobListing;
import za.ac.cput.domain.JobSeeker;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

public class Helper {

    // Add this method
    public static boolean isNullorEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static boolean validateApplication(JobSeeker jobSeeker, JobListing jobListing, String coverLetter, LocalDate appliedDate, String status){
        if (jobSeeker == null || jobListing == null || coverLetter == null || appliedDate == null || status == null) {
            return false;
        }
        if (coverLetter.trim().isEmpty()) {
            return false;
        }
        if (appliedDate.isAfter(LocalDate.now())) {
            return false;
        }
        List<String> validStatuses = Arrays.asList("pending", "approved", "rejected");
        return validStatuses.contains(status.toLowerCase());
    }

    public static boolean isValidEmail(String email){
        EmailValidator validator = EmailValidator.getInstance();
        return validator.isValid(email);
    }

    public static LocalDate getDateApplied(String id){
        int year = Integer.parseInt(id.substring(0,2));
        int month = Integer.parseInt(id.substring(2,4));
        int day = Integer.parseInt(id.substring(4,6));
        return LocalDate.of(year,month,day);
    }
}
