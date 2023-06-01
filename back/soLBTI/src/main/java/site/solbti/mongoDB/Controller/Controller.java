package site.solbti.mongoDB.Controller;

import site.solbti.mongoDB.Service.TestService;
import site.solbti.mongoDB.vo.BenefitTestVO;
import site.solbti.mongoDB.vo.TestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/test")
@RestController
public class Controller {



    @Autowired
    private TestService service;

    @GetMapping("/list")
    public List<TestVO> findAll(){
        return service.findAllTest();
    }

    @GetMapping(value = "/list/findbybenefit/{benefit}", produces = "application/text;charset=utf-8")
    public List<TestVO> findByCondition(@PathVariable String benefit){
        return null;
    }

    @PostMapping("/addTest")
    public TestVO addTest(@RequestParam TestVO test){
        return service.addTest(test);
    }

    @GetMapping("/benefit")
    public List<BenefitTestVO> testBenefit(){
        return service.testFindBenefit();
    }
}
