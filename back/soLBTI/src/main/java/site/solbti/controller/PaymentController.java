package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.solbti.repository.MembersRepository;
import site.solbti.repository.PaymentHistoryRepository;
import site.solbti.repository.PersonalCardRepository;
import site.solbti.vo.PaymentHistory;
import site.solbti.vo.PersonalCard;

import java.util.ArrayList;
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

    @GetMapping("/list.do")
    public List<PaymentHistory> monthSelectAll(int year, int month, long[] myCardCode){
        List<PaymentHistory> paylist = new ArrayList<>();
        for(long code : myCardCode){
            PersonalCard card = cardRepo.findById(code).orElse(null);
            paylist.addAll( payRepo.findByPaymentDateAAndPersonalCardOrderByPaymentDate(year, month, card));
        }
        return paylist;
    }

    @GetMapping("/total")
    public int sumMonthPay(int year, int month){
        return payRepo.findByPaymentTotal(year, month);
    }

    @GetMapping("/payrank")
    public  List<Object[]> payRankSelect(int year, int month) {
        return payRepo.payRankSelect(year, month);
    }

}
