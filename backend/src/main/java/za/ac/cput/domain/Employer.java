package za.ac.cput.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "employer")
@PrimaryKeyJoinColumn(name = "userID")
public class Employer extends User{

    private String companyName;
    private String industry;
    private String website;
    private String location;
    private String contactPerson;

    // One employer can post many job listings
    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("employer-joblisting")
    private List<JobListing> jobListings = new ArrayList<>();

    // Default constructor required by JPA
    public Employer(String email, String password, String role) {

        super(email, password, "EMPLOYER");
    }

    public Employer() {

        super();
    }

    private Employer(Builder builder) {
        super(builder.email, builder.password, builder.role);
        this.companyName = builder.companyName;
        this.industry = builder.industry;
        this.website = builder.website;
        this.location = builder.location;
        this.contactPerson = builder.contactPerson;
        this.jobListings = builder.jobListings;
    }

    // === Getters ===
    public Integer getEmployerID() {
        return super.getUserID();
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

    public String getCompanyName() {
        return companyName;
    }

    public String getIndustry() {
        return industry;
    }

    public String getWebsite() {
        return website;
    }

    public String getLocation() {
        return location;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public List<JobListing> getJobListings() {
        return jobListings;
    }

    // === toString ===
    @Override
    public String toString() {
        return "Employer{" +
                "employerID=" + getEmployerID() + '\n' +
                ", companyName='" + getCompanyName() + '\n' +
                ", industry='" + getIndustry() + '\n' +
                ", website='" + getWebsite() + '\n' +
                ", location='" + getLocation() + '\n' +
                ", contactPerson='" + getContactPerson() + '\n' +
                ", jobListings=" + getJobListings() + '\n' +
                '}';
    }

    // === Builder Pattern ===
    public static class Builder {

        private String email;
        private String password;
        private String role = "EMPLOYER";
        private String companyName;
        private String industry;
        private String website;
        private String location;
        private String contactPerson;
        private List<JobListing> jobListings = new ArrayList<>();



        public Employer.Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Employer.Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Employer.Builder setRole(String role) {
            this.role = role;
            return this;
        }

        public Builder setCompanyName(String companyName) {
            this.companyName = companyName;
            return this;
        }

        public Builder setIndustry(String industry) {
            this.industry = industry;
            return this;
        }

        public Builder setWebsite(String website) {
            this.website = website;
            return this;
        }

        public Builder setLocation(String location) {
            this.location = location;
            return this;
        }

        public Builder setContactPerson(String contactPerson) {
            this.contactPerson = contactPerson;
            return this;
        }

        public Builder setJobListings(List<JobListing> jobListings) {
            this.jobListings = jobListings;
            return this;
        }

        public Builder copy(Employer employer) {
            this.companyName = employer.getCompanyName();
            this.industry = employer.getIndustry();
            this.website = employer.getWebsite();
            this.location = employer.getLocation();
            this.contactPerson = employer.getContactPerson();
            this.jobListings = employer.getJobListings();
            return this;
        }

        public Employer build() {
            return new Employer(this);
        }
    }
}
