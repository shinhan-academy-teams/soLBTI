package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import site.solbti.repository.CommonCardRepository;
import site.solbti.repository.PersonalCardRepository;
import site.solbti.vo.PersonalCard;

@RestController
@RequestMapping("/cardlist")
@CrossOrigin(origins = "http://localhost:3000")
public class CardJoinController {
    @Autowired
    PersonalCardRepository personRepo;

    @Autowired
    CommonCardRepository commonRepo;


    @PostMapping(value = "/join.do/{cardNo}", consumes = "application/json")
    public PersonalCard registerCard(@PathVariable  Long cardNo, @RequestBody  PersonalCard pCard ){
        System.out.println(pCard);
        System.out.println("cno"+cardNo);
        pCard.setCard(commonRepo.findById(cardNo).orElse(null));
        PersonalCard card = personRepo.save(pCard);


        return card;
    }
}
