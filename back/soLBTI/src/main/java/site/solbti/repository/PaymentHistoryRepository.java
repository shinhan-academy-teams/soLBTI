package site.solbti.repository;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.PaymentHistory;
import site.solbti.vo.PersonalCard;

import java.util.HashMap;
import java.util.List;
import java.util.TreeMap;


public interface PaymentHistoryRepository extends CrudRepository<PaymentHistory, Long> {
    @Query(value="SELECT * FROM Payment_history WHERE EXTRACT(YEAR FROM payment_date) = ?1 AND EXTRACT(MONTH FROM payment_date) = ?2 and personal_card in ?3", nativeQuery = true)
    List<PaymentHistory> findByPaymentDayAndPersonalCardCode(int year, int month, Long[] code);

    @Query(value="select store_bigger_category, COUNT(*) AS count from Payment_history WHERE EXTRACT(YEAR FROM payment_date) = ?1 AND EXTRACT(MONTH FROM payment_date) = ?2 and personal_card in ?3 GROUP By store_bigger_category", nativeQuery = true)
    List<Object[]> payRankSelect(int year, int month, Long[] code);

    @Query("SELECT p.storeBiggerCategory, COUNT(*) AS count FROM PaymentHistory p WHERE p.personalCard.personalCardCode IN ?1 GROUP BY p.storeBiggerCategory ")
    List<Object[]> findCountByStoreCategory(List<Long> ids);
}
