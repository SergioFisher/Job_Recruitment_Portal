package za.ac.cput.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userID", nullable = false, updatable = false)
    private Integer userID;

    private String email;
    private String password;
    private String role;
    private LocalDateTime createdAt;

    // Default constructor with default values
    public User() {
        this.role = "USER";
        this.createdAt = LocalDateTime.now();
    }

    // Private constructor used by Builder
    private User(Builder builder) {
        this.email = builder.email;
        this.password = builder.password;
        this.role = builder.role != null ? builder.role : "USER";
        this.createdAt = builder.createdAt != null ? builder.createdAt : LocalDateTime.now();
    }

    public User(String email, String password, String administrator) {
    }

    // Getters
    public Integer getUserID() {
        return userID;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public String toString() {
        return "User{" +
                "userID=" + userID +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    // Builder pattern
    public static class Builder {
        private String email;
        private String password;
        private String role = "USER";
        private LocalDateTime createdAt;

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

        public Builder setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder copy(User user) {
            this.email = user.getEmail();
            this.password = user.getPassword();
            this.role = user.getRole();
            this.createdAt = user.getCreatedAt();
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}

