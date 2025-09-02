package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "Application")
public class Application {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer applicationID;


    @ManyToOne
    @JoinColumn(name = "jobSeeker_id", referencedColumnName = "id")
    private JobSeeker jobSeeker;

    @ManyToOne
    @JoinColumn(name = "jobListing_id", referencedColumnName = "id")
    private JobListing jobListing;

    private String coverLetter;

    private LocalDate appliedDate;

    private String status="ACTIVE";



    public Application(){}

    public Application(Builder builder){

        this.applicationID = builder.applicationID;
        this.appliedDate = builder.appliedDate;
        this.status = builder.status;
        this.coverLetter = builder.coverLetter;
        this.jobSeeker = builder.jobSeeker;
        this.jobListing = builder.jobListing;
    }


    public Integer getApplicationID() {
        return applicationID;
    }

    public JobSeeker getJobSeeker() {
        return jobSeeker;
    }

    public JobListing getJobListing() {
        return jobListing;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public String getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "Application{" +
                "applicationID=" + applicationID +
                ", coverLetter='" + coverLetter + '\'' +
                ", appliedDate=" + appliedDate +
                ", status='" + status + '\'' +
                '}';
    }





    public static class Builder{


        private Integer applicationID;

        private JobSeeker jobSeeker;

        private JobListing jobListing;

        private String coverLetter;

        private LocalDate appliedDate;

        private String status;



        public Builder setApplicationID( Integer applicationID){

            this.applicationID = applicationID;
            return this;

        }

        public Builder setJobSeeker(JobSeeker jobSeeker){

            this.jobSeeker = jobSeeker;
            return this;
        }

        public Builder setJobListing(JobListing jobListing){

            this.jobListing = jobListing;
            return this;
        }


        public Builder setCoverLetter(String coverLetter){

            this.coverLetter = coverLetter;
            return this;
        }


        public Builder setAppliedDate(LocalDate appliedDate){

            this.appliedDate = appliedDate;
            return this;
        }


        public Builder setStatus(String status){

            this.status = status;
            return this;

        }


        public Builder copy(Application application){

            this.applicationID = application.applicationID;
            this.jobSeeker = application.jobSeeker;
            this.jobListing = application.jobListing;
            this.coverLetter = application.coverLetter;
            this.appliedDate = application.appliedDate;
            this.status = application.status;
            return this;
        }


        public Application build(){

            return new Application(this);
        }


    }



}
