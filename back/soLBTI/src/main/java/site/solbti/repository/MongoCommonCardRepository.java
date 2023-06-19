package site.solbti.repository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import site.solbti.vo.MongoCommonCard;

import java.util.List;
import java.util.Map;

public interface MongoCommonCardRepository extends MongoRepository<MongoCommonCard, ObjectId> {

    MongoCommonCard findByCommonCardCode(Long id);

    MongoCommonCard findByCommonCardCode(String benefit);

    @Query("{ 'benefit.?0': { $exists: true } }")
    List<MongoCommonCard> findByBenefitCustum(String value);

    List<MongoCommonCard> findAllByOrderByCardviewDesc();



}
