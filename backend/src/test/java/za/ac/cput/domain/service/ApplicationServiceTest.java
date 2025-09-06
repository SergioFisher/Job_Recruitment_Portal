package za.ac.cput.domain.service;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import za.ac.cput.domain.Application;
import za.ac.cput.domain.JobListing;
import za.ac.cput.domain.JobSeeker;
import za.ac.cput.factory.ApplicationFactory;
import za.ac.cput.repository.ApplicationRepository;
import za.ac.cput.service.ApplicationService;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Transactional
@TestMethodOrder(MethodOrderer.MethodName.class)
class ApplicationServiceTest {

    @Autowired
    private ApplicationService service;

    private Application application;

    @Autowired
    private ApplicationRepository repository;

    private JobSeeker jobSeeker;
    private JobListing jobListing;
    private LocalDate appliedDate;



    @BeforeEach
    @Rollback
    void setUp() {

        repository.deleteAll();
        jobSeeker = new JobSeeker();
        jobListing = new JobListing();
        appliedDate = LocalDate.now();

        application = ApplicationFactory.createApplication(
                jobSeeker, jobListing, "Surgeon", appliedDate, "pending"
        );

        service.create(application);
    }


    @Test
    void a_create() {

        Application created = service.create(application);
        assertNotNull(created);
        System.out.println(created);

    }

    @Test
    void b_read() {

        Application read = service.read(application.getApplicationID());
        assertNotNull(read);
        System.out.println(read);

    }

    @Test
    void c_update() {

        Application updatedApp = new Application.Builder()
                .copy(application)
                .setStatus("approved")
                .build();

        Application result = service.update(updatedApp);
        assertNotNull(result);
        assertEquals("approved", result.getStatus());

    }


  //  @Test
   // void e_getAll() {
     //   Set<Application> all = (Set<Application>) service.getAll();
       // assertNotNull(all);
        //assertFalse(all.isEmpty());
        //assertEquals(1, all.size());
        //System.out.println(all);
   // }
}