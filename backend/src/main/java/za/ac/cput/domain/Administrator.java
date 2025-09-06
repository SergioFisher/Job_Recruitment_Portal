package za.ac.cput.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "administrators")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Administrator extends User {

    private String fullName;

    private String phone;

    private String department;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> permissions;// Example: ["MANAGE_USERS", "APPROVE_JOBS", "VIEW_REPORTS"]

    // Optional: link to monitored job listings
    @OneToMany
    @JoinColumn(name = "monitored_by_admin_id")
    private List<JobListing> monitoredJobListings;

    // Optional: link to monitored applications
    @OneToMany
    @JoinColumn(name = "monitored_by_admin_id")
    private List<Application> monitoredApplications;
}
