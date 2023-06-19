package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import site.solbti.repository.MembersRepository;
import site.solbti.vo.Members;

import java.util.*;

@Controller
public class IndexController {

    @Autowired
    MembersRepository memRepo;

    @GetMapping({"","/"})
    public String index(){
        return "index";
    }

    @GetMapping("/result")
    public Map<Integer, String> SolBTIResult(String solBTI){
        HashMap<Integer, String> result = null;
        List<Members> memList = memRepo.findByMemType(solBTI);

        System.out.println(memList);

        return result;
    }
}
