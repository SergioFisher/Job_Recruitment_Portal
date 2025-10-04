package za.ac.cput.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "administrators")
public class Administrator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer administratorID;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String role;
    private String userName;

    protected Administrator() {
    }

    private Administrator(Builder builder) {
        this.administratorID = builder.administratorID; // Will be auto-generated if null
        this.email = builder.email;
        this.password = builder.password;
        this.role = builder.role != null ? builder.role : "ADMIN";
        this.userName = builder.userName;
    }

    // Getters
    public Integer getAdministratorID() {
        return administratorID;
    }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public String getRole() { return role; }

    public String getUserName() { return userName; }

    @Override
    public String toString() {
        return "Administrator{" +
                "administratorID=" + administratorID +
                ", email='" + email + '\'' +
                ", userName='" + userName + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    public static class Builder {
        private Integer administratorID; // optional (ignored if null, DB generates it)
        private String email;
        private String password;
        private String role = "ADMIN"; // default role
        private String userName;

        public Builder setAdministratorID(Integer administratorID) {
            this.administratorID = administratorID;
            return this;
        }

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

        public Builder setUserName(String userName) {
            this.userName = userName;
            return this;
        }

        public Builder copy(Administrator administrator) {
            this.administratorID = administrator.getAdministratorID();
            this.email = administrator.getEmail();
            this.password = administrator.getPassword();
            this.role = administrator.getRole();
            this.userName = administrator.getUserName();
            return this;
        }

        public Administrator build() {
            return new Administrator(this);
        }
    }
}
