package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.solbti.repository.CommonCardRepository;
import site.solbti.vo.CommonCard;

import java.util.List;

@RestController
public class CardListController {
    @Autowired
    CommonCardRepository commonRepo;

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

}
