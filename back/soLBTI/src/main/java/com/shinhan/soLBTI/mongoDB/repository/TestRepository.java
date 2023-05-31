package com.shinhan.soLBTI.mongoDB.repository;

import com.shinhan.soLBTI.mongoDB.vo.TestVO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<TestVO,String> {

    
}
