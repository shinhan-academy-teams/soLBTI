package site.solbti.vo;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="personal_card")
@SequenceGenerator(
        name="PERSONALCARD_SEQ_GEN",
        sequenceName="PERSONALCARD_SEQ",
        initialValue=1,
        allocationSize=1
)
public class PersonalCard {

    @Id
    @GeneratedValue(
            strategy= GenerationType.SEQUENCE,
            generator="PERSONALCARD_SEQ_GEN"
    )
    private Long personalCardCode;
    private String serialNumber;
    private String cardCvc;
    private String firstName;
    private String lastName;
    @CreationTimestamp
    private Timestamp created;
    private Timestamp validated;
    private Timestamp paymentDate;
    private String brand;
    private String account;
    @JoinColumn(name = "common_card")
    @ManyToOne(fetch = FetchType.LAZY)
    private CommonCard card;
}

