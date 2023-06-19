package site.solbti;

import oracle.jdbc.logging.annotations.Log;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import site.solbti.repository.BiggerCategoryRepository;
import site.solbti.repository.PaymentHistoryRepository;

import java.util.HashMap;
import java.util.Map;

//사용내역 DB 관리용
@SpringBootTest
public class DBAdmin {

    @Autowired
    PaymentHistoryRepository historyRepository;

    @Autowired
    BiggerCategoryRepository biggerCategoryRepository;



    @Test
    void addBiggerCategorize(){

        Map<String, String> categoryMap = new HashMap<>();

        biggerCategoryRepository.findAll().forEach(category->{
            categoryMap.put(category.getStoreCategory(),category.getStoreBiggerCategory());
        });

        System.out.println(categoryMap);

        historyRepository.findAll().forEach(history->{

            String smallCategory = history.getStoreCategory();
            System.out.println(smallCategory);
            for(String key:categoryMap.keySet()){
                if(key.equals(smallCategory)){

                    history.setStoreBiggerCategory(categoryMap.get(key));
                }
                historyRepository.save(history);
            }
        });

    }
}
