package za.ac.cput.factory;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import za.ac.cput.domain.Application;
import za.ac.cput.domain.JobListing;
import za.ac.cput.domain.JobSeeker;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ApplicationFactoryTest {

    static LocalDate date = LocalDate.now();
    static JobSeeker jobSeeker;

    static JobListing jobListing;

    private static Application application = ApplicationFactory.createApplication(
            jobSeeker,
            jobListing,
            "Electrician",
            date,
            "pending");


    private static Application application2 = ApplicationFactory.createApplication(
            jobSeeker,
            jobListing,
            "Carpenter",
            date,
            "Approved");


    private static Application application3 = ApplicationFactory.createApplication(
            jobSeeker,
            jobListing,
            "Jeweler",
            date,
            "Rejected");



    @Test
    @Order(1)
    public void testCreateApplication(){

        assertNotNull(application);
        System.out.println(application.toString());
    }


    @Test
    @Order(2)
    public void testCreateApplication2(){

        assertNotNull(application2);
        System.out.println(application2.toString());
    }


    @Test
    @Order(3)
    public void testCreateApplication3(){

        assertNotNull(application3);
        System.out.println(application3.toString());
    }







}