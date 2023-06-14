package site.solbti.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.CommonCard;

import java.util.List;

public interface CommonCardRepository extends CrudRepository<CommonCard, Long> {
    List<CommonCard> findAllByOrderByCommonCardCode();

    List<CommonCard> findByCardTypeIsOrderByCommonCardCode(String type);

    List<CommonCard> findByCardNameLike(String cardName);

    List<CommonCard> findByCardNameContaining(String cardName);

    List<CommonCard> findByCommonCardCodeIn(List<Long> cardNoList);
}
