package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;



@Entity
@Table(name = "job_seekers")
public class JobSeeker extends User{

    private String fullName;
    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;

    @Lob
    private String resume;

    private String location;

    public JobSeeker() {}






    public Integer getUserID(){
        return super.getUserID();
    }
    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
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
        this.fullName = builder.fullName;
        this.email = builder.email;
        this.phoneNumber = builder.phoneNumber;
        this.dateOfBirth = builder.dateOfBirth;
        this.resume = builder.resume;
        this.location = builder.location;
    }

    @Override
    public String toString() {
        return "JobSeeker{" +
                "id=" + getUserID() +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", location='" + location + '\'' +
                '}';
    }


    public static class Builder {
        private String fullName;
        private String email;
        private String phoneNumber;
        private LocalDate dateOfBirth;
        private String resume;
        private String location;


        public Builder setFullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
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
            this.fullName = jobSeeker.fullName;
            this.email = jobSeeker.email;
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
