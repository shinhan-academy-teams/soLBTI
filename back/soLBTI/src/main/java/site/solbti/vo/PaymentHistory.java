package site.solbti.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import lombok.*;
import site.solbti.vo.enums.PaymentStatus;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="payment_history")
@SequenceGenerator(
        name="HISTORIES_SEQ_GEN",
        sequenceName="HISTORIES_SEQ",
        initialValue=1,
        allocationSize=1
)
public class PaymentHistory {

    @Id
    @GeneratedValue(
            strategy= GenerationType.SEQUENCE,
            generator="HISTORIES_SEQ_GEN"
    )
    private Long paymentCode;

    private Timestamp paymentDate;
    private String storeName;
    private Long price;
    private String storeCategory;
    private PaymentStatus paymentStatus;
    private String BusinessRegistrationNumber;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "personal_card")
    private PersonalCard personalCard;

}
