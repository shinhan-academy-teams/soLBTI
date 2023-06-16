package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.solbti.repository.MongoCommonCardRepository;
import site.solbti.vo.MongoCommonCard;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/card")
public class CardDetailController {

    @Autowired
    MongoCommonCardRepository mongoCommonCardRepository;

    @GetMapping("/{cno}/benefit")
    @ResponseBody
    public Map<String, List> benefit(@PathVariable Long cno){
        Map benefits = mongoCommonCardRepository.findByCommonCardCode(cno).getBenefit();

        return benefits;
    }

    @GetMapping("/{cno}/brand")
    @ResponseBody
    public List brand(@PathVariable Long cno){
        List brands = mongoCommonCardRepository.findByCommonCardCode(cno).getBrand();

        return brands;
    }

    @GetMapping("/pageview/{cno}")
    public void veiwCount(@PathVariable Long cno){
        MongoCommonCard card = mongoCommonCardRepository.findByCommonCardCode(cno);
        System.out.println(card);
        Integer cardview = card.getCardview();
        if(cardview==null) {
            card.setCardview(1);
        } else {
            card.setCardview(cardview+1);
        }
        mongoCommonCardRepository.save(card);
    }
}
