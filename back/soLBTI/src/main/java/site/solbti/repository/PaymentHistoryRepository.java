package site.solbti.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.PaymentHistory;
import site.solbti.vo.PersonalCard;

import java.util.List;
import java.util.Map;


import java.util.Optional;

public interface PaymentHistoryRepository extends CrudRepository<PaymentHistory, Long> {
    @Query("SELECT p FROM PaymentHistory p WHERE EXTRACT(YEAR FROM p.paymentDate) = ?1 AND EXTRACT(MONTH FROM p.paymentDate) = ?2 and p.personalCard =?3 ORDER BY p.paymentDate ASC")
    List<PaymentHistory> findByPaymentDateAAndPersonalCardOrderByPaymentDateAsc(int year, int month, PersonalCard pc);

    @Query("SELECT SUM(p.price) FROM PaymentHistory p WHERE EXTRACT(YEAR FROM p.paymentDate) = ?1 AND EXTRACT(MONTH FROM p.paymentDate) = ?2")
    Integer findByPaymentTotal(int year, int month);

    @Query("select storeCategory, COUNT(*) AS count from PaymentHistory WHERE EXTRACT(YEAR FROM paymentDate) = ?1 AND EXTRACT(MONTH FROM paymentDate) = ?2 GROUP By storeCategory")
    List<Object[]> payRankSelect(int year, int month);
}
