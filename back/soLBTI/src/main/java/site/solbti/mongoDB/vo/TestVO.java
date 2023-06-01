package site.solbti.mongoDB.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor @AllArgsConstructor
//@Document(collection = "tests")
public class TestVO {

    @Id
    private String testId;
    private String content;

}
