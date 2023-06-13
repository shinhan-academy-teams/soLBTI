package site.solbti;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.mapping.Document;
import site.solbti.repository.MongoCommonCardRepository;
import site.solbti.vo.CommonCard;
import site.solbti.vo.MongoCommonCard;

import java.lang.reflect.Array;
import java.util.Map;

@SpringBootTest
public class MongoDBTest {
    @Autowired
    MongoCommonCardRepository mongoRepo;

    @Test
    public void dataTest() {
        System.out.println(mongoRepo.findAll());
    }

    @Test
    public void insertTest() {
        MongoCommonCard mc = new MongoCommonCard();
        mc.setCommonCardCode(1001L);
        mongoRepo.save(mc);
    }

    @Test
    public void select(){


        MongoCommonCard card = mongoRepo.findByCommonCardCode(1001L);
        System.out.println(card);
        System.out.println("brand : "+card.getBrand());


    }
}
