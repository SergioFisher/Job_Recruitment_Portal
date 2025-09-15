package za.ac.cput.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "JobListing")
public class JobListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "job_listing_id")
    private Integer id;

    private String title;
    private String description;
    private String location;
    private String employmentType;
    private LocalDate postedDate;
    private String status = "OPEN";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private Employer employer;

    // Default constructor
    public JobListing() {}

    // Builder constructor
    private JobListing(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.description = builder.description;
        this.location = builder.location;
        this.employmentType = builder.employmentType;
        this.postedDate = builder.postedDate;
        this.status = builder.status;
        this.employer = builder.employer;
    }

    // Getters
    public Integer getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getLocation() { return location; }
    public String getEmploymentType() { return employmentType; }
    public LocalDate getPostedDate() { return postedDate; }
    public String getStatus() { return status; }
    public Employer getEmployer() { return employer; }

    @Override
    public String toString() {
        return "JobListing{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", employmentType='" + employmentType + '\'' +
                ", postedDate=" + postedDate +
                ", status='" + status + '\'' +
                ", employer=" + (employer != null ? employer.getCompanyName() : "null") +
                '}';
    }

    // Builder Class
    public static class Builder {
        private Integer id;
        private String title;
        private String description;
        private String location;
        private String employmentType;
        private LocalDate postedDate;
        private String status;
        private Employer employer;

        public Builder setId(Integer id) { this.id = id; return this; }
        public Builder setTitle(String title) { this.title = title; return this; }
        public Builder setDescription(String description) { this.description = description; return this; }
        public Builder setLocation(String location) { this.location = location; return this; }
        public Builder setEmploymentType(String employmentType) { this.employmentType = employmentType; return this; }
        public Builder setPostedDate(LocalDate postedDate) { this.postedDate = postedDate; return this; }
        public Builder setStatus(String status) { this.status = status; return this; }
        public Builder setEmployer(Employer employer) { this.employer = employer; return this; }

        public Builder copy(JobListing jobListing) {
            this.id = jobListing.id;
            this.title = jobListing.title;
            this.description = jobListing.description;
            this.location = jobListing.location;
            this.employmentType = jobListing.employmentType;
            this.postedDate = jobListing.postedDate;
            this.status = jobListing.status;
            this.employer = jobListing.employer;
            return this;
        }

        public JobListing build() {
            return new JobListing(this);
        }
    }
}
