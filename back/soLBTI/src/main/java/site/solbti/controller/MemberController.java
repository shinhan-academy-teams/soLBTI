package site.solbti.controller;

import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
//import site.solbti.security.MemberService;
import site.solbti.repository.MembersRepository;
import site.solbti.vo.Members;

import java.util.Optional;

@Log
@RestController
@RequestMapping("/auth")
public class MemberController {

    @Autowired
    MembersRepository memRepo;

    @PostMapping(value = "/signup", consumes = "application/json")
    public String joinUser(@RequestBody Members member){
        log.info("member insert \n"+member);
        memRepo.save(member);


        return "signup success";
    }

    @ResponseBody
    @PostMapping(value = "/login")
    public Members login(@RequestBody Members member) {
        String mem_id = member.getMemId();
        Members foundMember = null;
        Optional<Members> optionalMember = memRepo.findByMemId(mem_id);
        if (optionalMember.isPresent()) {
            Members loginUser = optionalMember.get();
            if (loginUser.getMemPwd().equals(member.getMemPwd())) {
                foundMember = loginUser;
                log.info(""+foundMember);
            }
        }

        return foundMember;
    }
}
