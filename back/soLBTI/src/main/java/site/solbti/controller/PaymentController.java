package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.solbti.repository.MembersRepository;
import site.solbti.repository.PaymentHistoryRepository;
import site.solbti.repository.PersonalCardRepository;
import site.solbti.vo.PaymentHistory;
import site.solbti.vo.PersonalCard;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    PaymentHistoryRepository payRepo;

    @Autowired
    MembersRepository memRepo;

    @Autowired
    PersonalCardRepository cardRepo;

    @GetMapping(value = "/list.do")
    public List<PaymentHistory> monthSelectAll(Integer year, Integer month, Long[] cardlist){ //결제 목록
        List<PaymentHistory> paylist = new ArrayList<>();

        for( Long c : cardlist){
            System.out.println(c);
           paylist.addAll( payRepo.findByPaymentDayAndPersonalCardCode(year, month, c));
        }
        return paylist;
    }

    @GetMapping("/payrank")
    public  List<Object[]> payRankSelect(int year, int month,  Long[] cardlist) { //결제 목록에 그릴 그래프
        List<Object[]> rank = new ArrayList<>();
        for( Long c : cardlist){

            rank.addAll( payRepo.payRankSelect(year, month, c) );
        }
        return rank;
    }

}
