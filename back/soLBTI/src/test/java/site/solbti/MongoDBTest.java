package site.solbti;

import net.bytebuddy.build.ToStringPlugin;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.mapping.Document;
import site.solbti.repository.MongoCommonCardRepository;
import site.solbti.vo.CommonCard;
import site.solbti.vo.MongoCommonCard;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class MongoDBTest {

    private static final Logger log = LoggerFactory.getLogger(MongoDBTest.class);
    @Autowired
    MongoCommonCardRepository mongoRepo;

    @Test
    public void dataTest() {
        List<MongoCommonCard> list = mongoRepo.findAll();
        System.out.println(list.get(1));
    }

    @Test
    public void selectTest() {
        MongoCommonCard card = mongoRepo.findByCommonCardCode(1001L);
        System.out.println(card.getBenefit());
        Map<String,String> benefit = card.getBenefit();
        List<List> brand = card.getBrand();
        for(String s : benefit.keySet()) {
            System.out.println(benefit.get(s));
        }
        for(List list : brand) {
            System.out.println(list);
            
        }

    }

    //@Test
    void insertTest() {
        MongoCommonCard mc = new MongoCommonCard();
        mc.setCommonCardCode(1001L);
        mongoRepo.save(mc);
    }

    @Test
    void select(){


        MongoCommonCard card = mongoRepo.findByCommonCardCode(1001L);
        System.out.println(card);
        System.out.println("brand : "+card.getBrand());


    }

    @Test
    void mongoSelect1(){
        List<MongoCommonCard> cardList = mongoRepo.findByBenefitCustum("생활");
        log.info(cardList.toString());
    }
}
