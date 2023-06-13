package site.solbti.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import site.solbti.vo.MongoCommonCard;

public interface MongoCommonCardRepository extends MongoRepository<MongoCommonCard, ObjectId> {
    public MongoCommonCard findByCommonCardCode(Long id);
}
