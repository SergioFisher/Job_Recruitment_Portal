package za.ac.cput.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Employer")
public class Employer  {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long employerID;
    private String companyName;
    private String industry;
    private String website;
    private String location;
    private String contactPerson;


    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("employer-joblisting")
    private List<JobListing> jobListings = new ArrayList<>();


    protected Employer() {
    }

    private Employer(Builder builder) {
        this.employerID = builder.employerID;
        this.companyName = builder.companyName;
        this.industry = builder.industry;
        this.website = builder.website;
        this.location = builder.location;
        this.contactPerson = builder.contactPerson;
        this.jobListings = builder.jobListings;
    }

    public Long getEmployerID() {
        return employerID;
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


    public static class Builder {
        private Long employerID;
        private String companyName;
        private String industry;
        private String website;
        private String location;
        private String contactPerson;
        private List<JobListing> jobListings = new ArrayList<>();

        public Builder setEmployerID(Long employerID) {
            this.employerID = employerID;
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
            this.employerID = employer.getEmployerID();
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
