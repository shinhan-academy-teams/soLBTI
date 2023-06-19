package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import site.solbti.repository.MembersRepository;
import site.solbti.repository.PaymentHistoryRepository;
import site.solbti.vo.PersonalCard;

import java.util.*;
import java.util.stream.Collectors;

@Controller
public class IndexController {

    @Autowired
    MembersRepository memRepo;
    @Autowired
    PaymentHistoryRepository historyRepo;

    @GetMapping({"","/"})
    public String index(){
        return "index";
    }

    @GetMapping("/result")
    public Map<Integer, String> SolBTIResult(String solBTI){
        HashMap<Integer, String> result = null;
        List<Long> cardList = memRepo.findByMemType(solBTI)
                .stream()
                .flatMap(members -> members.getMyCards().stream())
                .map(PersonalCard::getPersonalCardCode)
                .collect(Collectors.toList());

        List<Object[]> payrank = historyRepo.findCountByStoreCategory(cardList);

        // Count를 기준으로 payrank 리스트를 정렬
        Collections.sort(payrank, (o1, o2) -> {
            Long count1 = (Long) o1[1]; // 첫 번째 요소는 count
            Long count2 = (Long) o2[1]; // 첫 번째 요소는 count
            return count2.compareTo(count1); // count를 내림차순으로 정렬
        });

        int count = 1;
        for (Object[] array : payrank) {
            if (count > 3) {
                break; // 상위 3개 요소까지만 처리하고 종료
            }
            String category = (String) array[0];  // 첫 번째 요소는 storeCategory
            Long countValue = (Long) array[1];  // 두 번째 요소는 count

            result.put(count, category);
            count++;
        }

        return result;
    }
}
