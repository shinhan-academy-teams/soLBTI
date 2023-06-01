package site.solbti.mongoDB.vo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@Document(collection = "tests")
public class BenefitTestVO {

    @Id
    private String testId;
    private ArrayList<String> benefit;
}
