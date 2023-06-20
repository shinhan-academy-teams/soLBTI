package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.solbti.repository.CommonCardRepository;
import site.solbti.repository.MongoCommonCardRepository;
import site.solbti.repository.PersonalCardRepository;
import site.solbti.vo.PersonalCard;

import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/cardlist")
@CrossOrigin(origins = "http://localhost:3000")
public class CardJoinController {
    @Autowired
    PersonalCardRepository personRepo;

    @Autowired
    CommonCardRepository commonRepo;

    @Autowired
    MongoCommonCardRepository mongoCommonCardRepository;

    @PostMapping(value = "/join.do/{cardNo}", consumes = "application/json")
    public PersonalCard registerCard(@PathVariable  Long cardNo, @RequestBody  PersonalCard pCard ) throws NoSuchAlgorithmException {
        SHA256 sha256 = new SHA256();
        System.out.println("pcard>>"+pCard);
        String cryptogram = sha256.encrypt(String.valueOf(pCard.getPassword()));

        //validated
        LocalDate currentDate= LocalDate.now();
        LocalDate futureDate = currentDate.plusYears(5);
        int futureYear = futureDate.getYear();
        Month futureMonth = futureDate.getMonth();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = futureDate.format(formatter)+" 00:00:00.000";
        Timestamp timestamp = Timestamp.valueOf(formattedDate);
        pCard.setValidated(timestamp);

        //cvc 랜덤하게 주기
        pCard.setCardCvc(Integer.toString(((int)Math.random()*900)+100));

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
        pCard.setSerialNumber(sN1);
        pCard.setPassword(cryptogram);

        pCard.setCard(commonRepo.findById(cardNo).orElse(null));
        PersonalCard card = personRepo.save(pCard);

        return card;
    }
}
