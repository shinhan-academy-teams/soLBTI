package site.solbti.vo;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collation = "common_card")
public class MongoCommonCard {
    @Id
    private Long commonCardCode;
    private Map benefit;
    private String brand;
}
