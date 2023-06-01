package site.solbti.repository;

import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.PaymentHistory;
import site.solbti.vo.PersonalCard;

public interface PaymentHistoryRepository extends CrudRepository<PaymentHistory, Long> {

}
