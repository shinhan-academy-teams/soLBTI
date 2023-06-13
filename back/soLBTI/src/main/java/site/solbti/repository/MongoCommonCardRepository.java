package site.solbti.repository;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import site.solbti.vo.MongoCommonCard;

public interface MongoCommonCardRepository extends MongoRepository<MongoCommonCard,Long> {
    public MongoCommonCard findByCommonCardCode(Long id);
}
