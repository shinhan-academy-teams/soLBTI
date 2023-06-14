package site.solbti.controller;

import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import site.solbti.repository.CommonCardRepository;
import site.solbti.repository.MongoCommonCardRepository;
import site.solbti.vo.CommonCard;
import site.solbti.vo.MongoCommonCard;

import java.util.ArrayList;
import java.util.List;

@Log
@RestController
public class CardListController {
    @Autowired
    CommonCardRepository commonRepo;

    @Autowired
    MongoCommonCardRepository mongoCommonCardRepository;

    @GetMapping("/all-card.do")
    public List<CommonCard> showAllCard(){
        return commonRepo.findAllByOrderByCommonCardCode();
    }

    @GetMapping("/credit-card.do")
    public List<CommonCard> showCreditCard() {
        return commonRepo.findByCardTypeIsOrderByCommonCardCode("credit");
    }

    @GetMapping("/debit-card.do")
    public List<CommonCard> showDebitCard() {
        return commonRepo.findByCardTypeIsOrderByCommonCardCode("debit");
    }

    @GetMapping("/card-detail.do/{cno}")
    public CommonCard showCardDetail(@PathVariable Long cno) {
        return commonRepo.findById(cno).orElse(null);
    }

    @GetMapping("/card/search/{cardname}")
    public List<CommonCard> searchCard(@PathVariable String cardname){return commonRepo.findByCardNameContaining(cardname);}

    @GetMapping("/card/searchByBenefit/{benefit}")
    public List<CommonCard> searchByBenefit(@PathVariable String benefit){
        List<MongoCommonCard> mongoCommonCards = mongoCommonCardRepository.findByBenefitCustum(benefit);

        List<Long> cardNoList = new ArrayList<>();

        log.info(cardNoList.toString());

        for(MongoCommonCard mongoCommonCard:mongoCommonCards){
            cardNoList.add(mongoCommonCard.getCommonCardCode());
        }

        List<CommonCard> resultCommonCard = commonRepo.findByCommonCardCodeIn(cardNoList);

        log.info(resultCommonCard.toString());

        return resultCommonCard;
    }
}
