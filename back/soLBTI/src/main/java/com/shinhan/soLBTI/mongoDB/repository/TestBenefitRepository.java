package com.shinhan.soLBTI.mongoDB.repository;

import com.shinhan.soLBTI.mongoDB.vo.BenefitTestVO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestBenefitRepository extends MongoRepository<BenefitTestVO, String> {
}
