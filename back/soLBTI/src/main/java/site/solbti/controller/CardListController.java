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
import java.util.stream.Collectors;

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

    @GetMapping("/card-chart.do")
    public List<CommonCard> selectCardTopTen() {
        List<MongoCommonCard> allCardView = mongoCommonCardRepository.findAllByOrderByCardviewDesc();
        List<CommonCard> cardList = new ArrayList<>();
        for(int i=0; i<10; i++) {
            if(allCardView.get(i).getCardview()!=null) {
                Long cardCode = allCardView.get(i).getCommonCardCode();
                cardList.add(commonRepo.findById(cardCode).orElse(null));
            }
        }
        System.out.println(cardList);
        return cardList;
    }

    @GetMapping("/cardCarousel")
    public List<String> selectCardList(){
        List<String> cardList = commonRepo.findAll().stream().map(CommonCard::getImgURL).collect(Collectors.toList());
        return cardList;
    }
}
