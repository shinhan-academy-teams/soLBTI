package site.solbti.vo;

import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="common_card")
@SequenceGenerator(
        name="CARDS_SEQ_GEN",
        sequenceName="CARDS_SEQ",
        initialValue=10,
        allocationSize=10
)
public class CommonCard {
    @Id
    @GeneratedValue(
            strategy= GenerationType.SEQUENCE,
            generator="CARDS_SEQ_GEN"
    )
    private long commonCardCode;
    private String imgURL;
    private String cardName;
    private String cardContent;
    private String cardType;
}
