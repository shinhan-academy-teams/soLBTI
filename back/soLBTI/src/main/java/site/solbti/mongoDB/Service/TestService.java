package site.solbti.mongoDB.Service;

import site.solbti.mongoDB.repository.TestBenefitRepository;
import site.solbti.mongoDB.repository.TestRepository;
import site.solbti.mongoDB.vo.BenefitTestVO;
import site.solbti.mongoDB.vo.TestVO;
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
