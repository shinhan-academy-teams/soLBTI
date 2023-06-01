package site.solbti.repository;

import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.PaymentHistory;

public interface PaymentHistoryRepository extends CrudRepository<PaymentHistory, Long> {

}
