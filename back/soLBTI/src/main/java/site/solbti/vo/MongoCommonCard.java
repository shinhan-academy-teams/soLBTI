package site.solbti.vo;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document("common_card")
public class MongoCommonCard {
    @Id
    private ObjectId id;
    private Long commonCardCode;
    private Map<String,String> benefit;
    private List<List> brand;
    private Integer cardview;
}
