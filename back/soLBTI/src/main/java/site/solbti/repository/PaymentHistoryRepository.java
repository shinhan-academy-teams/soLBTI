package site.solbti.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.PaymentHistory;
import java.util.List;

import java.util.Optional;

public interface PaymentHistoryRepository extends CrudRepository<PaymentHistory, Long> {
    @Query("SELECT p FROM PaymentHistory p WHERE EXTRACT(YEAR FROM p.paymentDate) = ?1 AND EXTRACT(MONTH FROM p.paymentDate) = ?2 ORDER BY p.paymentDate ASC")
    List<PaymentHistory> findByPaymentDateOrderByPaymentDateAsc(int year, int month);

    @Query("SELECT SUM(p.price) FROM PaymentHistory p WHERE EXTRACT(YEAR FROM p.paymentDate) = ?1 AND EXTRACT(MONTH FROM p.paymentDate) = ?2")
    Integer findByPaymentTotal(int year, int month);
}
