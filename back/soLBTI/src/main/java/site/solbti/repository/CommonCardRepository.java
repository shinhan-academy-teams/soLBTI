package site.solbti.repository;

import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.CommonCard;

import java.util.List;

public interface CommonCardRepository extends CrudRepository<CommonCard, Long> {
    public List<CommonCard> findAllByOrderByCommonCardCode();

    public List<CommonCard> findByCardTypeIsOrderByCommonCardCode(String type);
}
