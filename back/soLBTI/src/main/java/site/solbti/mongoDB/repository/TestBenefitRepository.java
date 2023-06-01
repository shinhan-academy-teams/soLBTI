package site.solbti.mongoDB.repository;

import site.solbti.mongoDB.vo.BenefitTestVO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestBenefitRepository extends MongoRepository<BenefitTestVO, String> {
}
