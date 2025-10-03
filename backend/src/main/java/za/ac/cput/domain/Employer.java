package za.ac.cput.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "employers")
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employerID;

    private String email;
    private String password;
    private String role;
    private String companyName;
    private String industry;
    private String website;
    private String location;
    private String contactPerson;

    // Default constructor
    public Employer() {
        this.role = "EMPLOYER";
    }

    // Private constructor for Builder
    private Employer(Builder builder) {
        this.email = builder.email;
        this.password = builder.password;
        this.role = builder.role != null ? builder.role : "EMPLOYER";
        this.companyName = builder.companyName;
        this.industry = builder.industry;
        this.website = builder.website;
        this.location = builder.location;
        this.contactPerson = builder.contactPerson;
    }

    // Getters
    public Integer getEmployerID() {
        return employerID;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
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

    @Override
    public String toString() {
        return "Employer{" +
                "employerID=" + employerID +
                ", email='" + email + '\'' +
                ", companyName='" + companyName + '\'' +
                ", industry='" + industry + '\'' +
                ", website='" + website + '\'' +
                ", location='" + location + '\'' +
                ", contactPerson='" + contactPerson + '\'' +
                '}';
    }

    // Builder pattern
    public static class Builder {
        private String email;
        private String password;
        private String role = "EMPLOYER";
        private String companyName;
        private String industry;
        private String website;
        private String location;
        private String contactPerson;

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

        public Builder copy(Employer employer) {
            this.email = employer.getEmail();
            this.password = employer.getPassword();
            this.role = employer.getRole();
            this.companyName = employer.getCompanyName();
            this.industry = employer.getIndustry();
            this.website = employer.getWebsite();
            this.location = employer.getLocation();
            this.contactPerson = employer.getContactPerson();
            return this;
        }

        public Employer build() {
            return new Employer(this);
        }
    }
}
