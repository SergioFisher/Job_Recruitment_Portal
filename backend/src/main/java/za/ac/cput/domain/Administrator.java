package za.ac.cput.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "administrators")
@PrimaryKeyJoinColumn(name = "userID")
public class Administrator extends User {

    private String userName;

    private boolean deleteJobs = true;



    public Administrator(String email, String password, String role) {

        super(email, password, "ADMINISTRATOR");
    }

    public Administrator() {

        super();
    }


    private Administrator(Builder builder){

        super(builder.email, builder.password, "ADMINISTRATOR");
        this.userName = builder.userName;
        this.deleteJobs = builder.deleteJobs;

    }


    public Integer getAdministratorID() {
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

    public String getUserName() { return userName;}

    public boolean isDeleteJobs() { return deleteJobs;}


    @Override
    public String toString() {
        return "Administrator{" +
                "userName='" + userName + '\'' +
                ", deleteJobs=" + deleteJobs +
                '}';
    }



    public static class Builder {

        private String email;
        private String password;
        private String role = "ADMINISTRATOR";

        private String userName;

        private boolean deleteJobs;


        public Administrator.Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Administrator.Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Administrator.Builder setRole(String role) {
            this.role = role;
            return this;
        }

        public Administrator.Builder setName(String userName) {
            this.userName = userName;
            return this;
        }


        public Administrator.Builder setDeleteJobs(boolean deleteJobs) {
            this.deleteJobs = deleteJobs;
            return this;
        }


        public Administrator.Builder copy(Administrator administrator) {
            this.email = administrator.getEmail();
            this.password = administrator.getPassword();
            this.role = administrator.getRole();
            this.userName = administrator.userName;
            this.deleteJobs = administrator.deleteJobs;
            return this;
        }

        public Administrator build() {
            return new Administrator(this);
        }

    }
}
