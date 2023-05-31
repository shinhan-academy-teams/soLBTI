package com.shinhan.soLBTI.mongoDB.Service;

import com.shinhan.soLBTI.mongoDB.repository.TestBenefitRepository;
import com.shinhan.soLBTI.mongoDB.repository.TestRepository;
import com.shinhan.soLBTI.mongoDB.vo.BenefitTestVO;
import com.shinhan.soLBTI.mongoDB.vo.TestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    @Autowired
    private TestRepository repo;

    @Autowired
    private TestBenefitRepository bRepo;

    public List<TestVO> findAllTest(){
        return repo.findAll();
    }

    public TestVO addTest(TestVO test){
        return repo.save(test);
    }

    public List<BenefitTestVO> testFindBenefit(){
        return bRepo.findAll();
    }



}
