package za.ac.cput.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "job_seekers")
@PrimaryKeyJoinColumn(name = "userID")
public class JobSeeker extends User {

    private String fullName;
    private String phoneNumber;
    private LocalDate dateOfBirth;

    @Lob
    private String resume;

    private String location;

    public JobSeeker(String email, String password, String role) {
        super(email, password, role);
    }

    public JobSeeker() {
        super();
    }

    public Integer getUserID() {
        return super.getUserID();
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return super.getEmail();
    }

    public String getPassword() {
        return super.getPassword();
    }

    public String getRole() {
        return super.getRole();
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getResume() {
        return resume;
    }

    public String getLocation() {
        return location;
    }

    private JobSeeker(Builder builder) {
        super(builder.email, builder.password, builder.role);
        this.fullName = builder.fullName;
        this.phoneNumber = builder.phoneNumber;
        this.dateOfBirth = builder.dateOfBirth;
        this.resume = builder.resume;
        this.location = builder.location;
    }

    @Override
    public String toString() {
        return "JobSeekerRepository{" +
                "id=" + getUserID() +
                ", fullName='" + fullName + '\'' +
                ", email='" + getEmail() + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", location='" + location + '\'' +
                '}';
    }

    public static class Builder {
        private String email;
        private String password;
        private String role = "JOB_SEEKER";
        private String fullName;
        private String phoneNumber;
        private LocalDate dateOfBirth;
        private String resume;
        private String location;

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setRole(String role) {
            this.role = role;
            return this;
        }

        public Builder setFullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public Builder setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Builder setDateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public Builder setResume(String resume) {
            this.resume = resume;
            return this;
        }

        public Builder setLocation(String location) {
            this.location = location;
            return this;
        }

        public Builder copy(JobSeeker jobSeeker) {
            this.email = jobSeeker.getEmail();
            this.password = jobSeeker.getPassword();
            this.role = jobSeeker.getRole();
            this.fullName = jobSeeker.fullName;
            this.phoneNumber = jobSeeker.phoneNumber;
            this.dateOfBirth = jobSeeker.dateOfBirth;
            this.resume = jobSeeker.resume;
            this.location = jobSeeker.location;
            return this;
        }

        public JobSeeker build() {
            return new JobSeeker(this);
        }
    }
}