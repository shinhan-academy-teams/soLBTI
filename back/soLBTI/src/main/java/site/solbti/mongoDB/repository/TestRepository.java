package site.solbti.mongoDB.repository;

import site.solbti.mongoDB.vo.TestVO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<TestVO,String> {

    
}
