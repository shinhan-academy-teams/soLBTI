package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.solbti.repository.MembersRepository;
import site.solbti.repository.PaymentHistoryRepository;
import site.solbti.repository.PersonalCardRepository;
import site.solbti.vo.PaymentHistory;
import site.solbti.vo.PersonalCard;

import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    PaymentHistoryRepository payRepo;

    @Autowired
    MembersRepository memRepo;

    @Autowired
    PersonalCardRepository cardRepo;

    @Autowired
    PaymentHistoryRepository historyRepo;

    @GetMapping(value = "/list.do")
    public List<PaymentHistory> monthSelectAll(Integer year, Integer month, Long[] cardlist){ //결제 목록
        List<PaymentHistory> paylist = new ArrayList<>();

        paylist.addAll( payRepo.findByPaymentDayAndPersonalCardCode(year, month, cardlist));

        return paylist;
    }

    @GetMapping("/payrank")
    public  List<Object[]> payRankSelect(int year, int month,  Long[] cardlist) { //결제 목록에 그릴 그래프
        List<Object[]> rank = new ArrayList<>();

        rank.addAll( payRepo.payRankSelect(year, month, cardlist) );

        return rank;
    }

    @GetMapping("/age/{age}")
    public List<Object[]> ageResult(@PathVariable Integer age){
        List<Object[]> rank = new ArrayList<>();
        int minAge = age;
        int maxAge = age+9;
        List<Long> cardList = memRepo.findByAge(minAge, maxAge)
				.stream()
				.flatMap(members -> members.getMyCards().stream())
				.map(PersonalCard::getPersonalCardCode)
				.collect(Collectors.toList());

        int count = 1;
        for (Object[] array : historyRepo.findCountByStoreCategory(cardList)) {
            if (count > 10) {
                break; // 상위 10개 요소까지만 처리하고 종료
            }

            rank.add(array);
            count++;
        }

        return rank;
    }

    @GetMapping("/gender/{gender}")
    public List<Object[]> genderResult(@PathVariable String gender){
        List<Object[]> rank = new ArrayList<>();
        List<Long> cardList = memRepo.findByMemGender(gender)
                .stream()
                .flatMap(members -> members.getMyCards().stream())
                .map(PersonalCard::getPersonalCardCode)
                .collect(Collectors.toList());

        int count = 1;
        for (Object[] array : historyRepo.findCountByStoreCategory(cardList)) {
            if (count > 10) {
                break; // 상위 10개 요소까지만 처리하고 종료
            }

            rank.add(array);
            count++;
        }

        return rank;
    }

}
