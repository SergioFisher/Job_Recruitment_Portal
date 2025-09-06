package za.ac.cput.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "administrators")
public class Administrator extends User {

    private String fullName;

    private String phone;

    private String department;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> permissions;// Example: ["MANAGE_USERS", "APPROVE_JOBS", "VIEW_REPORTS"]



}
