package za.ac.cput.domain;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Table(name = "job_seekers")
public class JobSeeker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Setter
    private String email;
    @Setter
    private String password;
    @Setter
    private String fullName;
    @Setter
    private String phoneNumber;

    // Store date of birth as long (milliseconds)
    @Setter
    private long dateOfBirth;

    @Setter
    @Lob
    private String resume;

    @Setter
    private String location;

    public JobSeeker() {}

    private JobSeeker(Builder builder) {
        this.email = builder.email;
        this.password = builder.password;
        this.fullName = builder.fullName;
        this.phoneNumber = builder.phoneNumber;
        this.dateOfBirth = builder.dateOfBirth;
        this.resume = builder.resume;
        this.location = builder.location;
    }

    // Getters and setters
    public Integer getId() { return id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getFullName() { return fullName; }
    public String getPhoneNumber() { return phoneNumber; }
    public long getDateOfBirth() { return dateOfBirth; }
    public String getResume() { return resume; }
    public String getLocation() { return location; }

    // Builder
    public static class Builder {
        private String email;
        private String password;
        private String fullName;
        private String phoneNumber;
        private long dateOfBirth;
        private String resume;
        private String location;

        public Builder setEmail(String email) { this.email = email; return this; }
        public Builder setPassword(String password) { this.password = password; return this; }
        public Builder setFullName(String fullName) { this.fullName = fullName; return this; }
        public Builder setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public Builder setDateOfBirth(long dateOfBirth) { this.dateOfBirth = dateOfBirth; return this; }
        public Builder setResume(String resume) { this.resume = resume; return this; }
        public Builder setLocation(String location) { this.location = location; return this; }

        public Builder copy(JobSeeker js) {
            this.email = js.email;
            this.password = js.password;
            this.fullName = js.fullName;
            this.phoneNumber = js.phoneNumber;
            this.dateOfBirth = js.dateOfBirth;
            this.resume = js.resume;
            this.location = js.location;
            return this;
        }

        public JobSeeker build() { return new JobSeeker(this); }
    }
}
