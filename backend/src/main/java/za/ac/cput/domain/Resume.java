package za.ac.cput.domain;

//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "resume"
)
public class Resume {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(
            nullable = false,
            length = 255
    )
    private String fileName;
    @Column(
            nullable = false,
            length = 500
    )
    private String fileUrl;
    @Lob
    @Column(
            columnDefinition = "TEXT"
    )
    private String summary;
    @Column(
            nullable = false
    )
    private String jobSeekerId;
    @Column(
            nullable = false
    )
    private String uploadedDate = LocalDateTime.now().toString();

    public Resume() {
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (!(o instanceof Resume)) {
            return false;
        } else {
            Resume resume = (Resume)o;
            return this.id != null && this.id.equals(resume.id);
        }
    }

    public int hashCode() {
        return this.getClass().hashCode();
    }
}
