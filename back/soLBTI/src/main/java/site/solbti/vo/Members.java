package site.solbti.vo;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import site.solbti.vo.enums.MemberRole;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="members")
@SequenceGenerator(
        name="MEMBERS_SEQ_GEN",
        sequenceName="MEMBERS_SEQ",
        initialValue=1,
        allocationSize=1
)
public class Members {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "MEMBERS_SEQ_GEN"
    )
    private long memCode;

    @Column(nullable = false, unique = true)
    private String memId;
    @Column(nullable = false)
    private String memPwd;
    @Column(nullable = false)
    private String memName;
    @Column(nullable = false, unique = true)
    private String memEmail;
    @Column(nullable = false)
    private String memAddr;
    @Column(nullable = false, unique = true)
    private String memPhone;
    @Column(nullable = false)
    @ColumnDefault("0.0")
    private double memPoint;
    @CreationTimestamp
    private Timestamp created;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private List<PersonalCard> myCards;

    @Enumerated(EnumType.STRING)
    private MemberRole mrole;
}