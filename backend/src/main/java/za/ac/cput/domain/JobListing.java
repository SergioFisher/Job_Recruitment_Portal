package za.ac.cput.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "job_listings")
public class JobListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 2000)
    private String description;
    private String location;
    private String requirements;
    private String salary;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @ManyToOne(optional = false)
    @JoinColumn(name = "employer_id", nullable = false)
    private Employer employer;

    protected JobListing() {}

    private JobListing(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.description = builder.description;
        this.location = builder.location;
        this.requirements = builder.requirements;
        this.salary = builder.salary;
        this.image = builder.image;
        this.employer = builder.employer;
    }

    // === Getters ===
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getLocation() { return location; }
    public String getRequirements() { return requirements; }
    public String getSalary() { return salary; }
    public byte[] getImage() { return image; }
    public Employer getEmployer() { return employer; }

    // === Builder ===
    public static class Builder {
        private Long id;
        private String title;
        private String description;
        private String location;
        private String requirements;
        private String salary;
        private byte[] image;
        private Employer employer;

        public Builder setId(Long id) { this.id = id; return this; }
        public Builder setTitle(String title) { this.title = title; return this; }
        public Builder setDescription(String description) { this.description = description; return this; }
        public Builder setLocation(String location) { this.location = location; return this; }
        public Builder setRequirements(String requirements) { this.requirements = requirements; return this; }
        public Builder setSalary(String salary) { this.salary = salary; return this; }
        public Builder setImage(byte[] image) { this.image = image; return this; }
        public Builder setEmployer(Employer employer) { this.employer = employer; return this; }

        public JobListing build() { return new JobListing(this); }
    }
}
