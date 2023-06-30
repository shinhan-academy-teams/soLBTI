package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.solbti.repository.CommonCardRepository;
import site.solbti.repository.MembersRepository;
import site.solbti.repository.MongoCommonCardRepository;
import site.solbti.repository.PersonalCardRepository;
import site.solbti.vo.CommonCard;
import site.solbti.vo.MongoCommonCard;
import site.solbti.vo.PersonalCard;

import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/cardlist")
@CrossOrigin(origins = "http://localhost:3000")
public class CardJoinController {
    @Autowired
    PersonalCardRepository personRepo;

    @Autowired
    MembersRepository memRepo;

    @Autowired
    CommonCardRepository commonRepo;

    @Autowired
    MongoCommonCardRepository mongoCommonCardRepository;

    @PostMapping(value = "/join.do/{cardNo}", consumes = "application/json")
    public void registerCard(@PathVariable  Long cardNo, @RequestBody Map<String, Object> requestData ) throws NoSuchAlgorithmException {

        CommonCard commoncard= commonRepo.findById(cardNo).orElse(null);

        LinkedHashMap pCard = (LinkedHashMap) requestData.get("pCard");
        Long memCode= Long.parseLong((String) requestData.get("memCode"));

        String pass = (String)pCard.get("password");
        SHA256 sha256 = new SHA256();
        String cryptogram = sha256.encrypt(pass);

        LocalDate currentDate= LocalDate.now();
        LocalDate futureDate = currentDate.plusYears(5);
        int futureYear = futureDate.getYear();
        Month futureMonth = futureDate.getMonth();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = futureDate.format(formatter)+" 00:00:00.000";
        Timestamp timestamp = Timestamp.valueOf(formattedDate);

        Random random= new Random();

        //serial_number
        String sN1="9876-";
        String sN2="";
        String sN3="";
        String sN4="";
        for(int i=0; i<4; i++){
            sN2+=random.nextInt(10);
            sN3+=random.nextInt(10);
            sN4+=random.nextInt(10);
        }
        sN1+=sN2; sN1+="-";
        sN1+=sN3; sN1+="-";
        sN1+=sN4;

        String fname= (String) pCard.get("firstName");
        String lname= (String) pCard.get("lastName");
        Integer pDate =Integer.parseInt(String.valueOf(pCard.get("paymentDate")));

        int randomNumber = (int) (Math.random() * 900) + 100;
        String cvc = Integer.toString(randomNumber);

        String account= (String) pCard.get("account");
        System.out.println(pDate+"<<pDate");
        PersonalCard pcard = PersonalCard.builder().cardCvc(cvc).brand((String) pCard.get("brand")).firstName(fname).lastName(lname)
                .paymentDate(pDate).serialNumber(sN1).password(cryptogram).created(timestamp).validated(Timestamp.valueOf(formattedDate)).account(account).card(commoncard).build();

        personRepo.save(pcard);

        memRepo.findById(memCode).ifPresent(entity->{
            List<PersonalCard> myCards = entity.getMyCards();
            myCards.add(pcard);
            entity.setMyCards(myCards);
            memRepo.save(entity);

        });

        // 카드 인기차트 반영
        MongoCommonCard card = mongoCommonCardRepository.findByCommonCardCode(cardNo);
        Integer cardview = card.getCardview();
        if(cardview==null) {
            card.setCardview(3);
        } else {
            card.setCardview(cardview+3);
        }
        mongoCommonCardRepository.save(card);

    }
}
