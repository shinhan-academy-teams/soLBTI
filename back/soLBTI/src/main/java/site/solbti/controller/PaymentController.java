package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.solbti.repository.PaymentHistoryRepository;
import site.solbti.vo.PaymentHistory;
import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    PaymentHistoryRepository payRepo;

    @GetMapping("/list.do")
    public List<PaymentHistory> monthSelectAll(int year, int month){
        return payRepo.findByPaymentDateOrderByPaymentDateAsc(year,month);
    }

    @GetMapping("total")
    public int sumMonthPay(int year, int month){
        return payRepo.findByPaymentTotal(year, month);
    }

}
