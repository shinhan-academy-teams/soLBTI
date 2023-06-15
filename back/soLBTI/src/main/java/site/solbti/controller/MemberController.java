package site.solbti.controller;

import io.jsonwebtoken.Claims;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
//import site.solbti.security.MemberService;
import site.solbti.Jwt.JwtProvider;
import site.solbti.Jwt.TokenDataResponse;
import site.solbti.Jwt.TokenResponse;
import site.solbti.repository.MembersRepository;
import site.solbti.vo.Members;
import site.solbti.vo.PersonalCard;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log
@RestController
@RequestMapping("/auth")
public class MemberController {

    @Autowired
    MembersRepository memRepo;

    @Autowired
    JwtProvider jwtProvider;

    @GetMapping("/mycardlist.do")
    public List<PersonalCard> mycardSelect(Long id) {
        List<PersonalCard> myCards = new ArrayList<>();
        memRepo.findByMemCode(id).ifPresent( entity->{
            if(!entity.getMyCards().isEmpty()){
                myCards.addAll(entity.getMyCards());
            }

        });
        return myCards;
    }

    @GetMapping ("/modify.do")
    public Members findMemInfo (Long memCode) {
       return memRepo.findById(memCode).orElse(null);
    }

    @PutMapping  (value = "/modify.do")
    public Members updateMemInfo (Long memCode, String phone, String email, String addr) {
//        System.out.println("id"+memCode);
//        System.out.println("phone"+phone);
//        System.out.println("email"+email);
//        System.out.println("Addr"+addr);
        Members members = memRepo.findById(memCode).orElse(null);
        members.setMemAddr(addr);
        members.setMemEmail(email);
        members.setMemPhone(phone);
        memRepo.save(members);

        return members;
    }

    @PostMapping(value = "/signup", consumes = "application/json")
    public String joinUser(@RequestBody Members member){
        log.info("member insert \n"+member);
        memRepo.save(member);


        return "signup success";
    }

    @ResponseBody
    @PostMapping(value = "/login")
    public TokenResponse login(@RequestBody Members member) {
        String mem_id = member.getMemId();
        TokenResponse tokenResponse=null;
        Optional<Members> optionalMember = memRepo.findByMemId(mem_id);
        if (optionalMember.isPresent()) {
            Members loginUser = optionalMember.get();
            if (loginUser.getMemPwd().equals(member.getMemPwd())) {
                String token = jwtProvider.createToken(mem_id); // 토큰 생성
                Claims claims = jwtProvider.parseJwtToken("Bearer "+ token); // 토큰 검증

                TokenDataResponse tokenDataResponse = new TokenDataResponse(token, claims.getSubject(), loginUser.getMemCode(), claims.getIssuedAt().toString(), claims.getExpiration().toString());
                tokenResponse = new TokenResponse("200", "OK", tokenDataResponse);

                return tokenResponse;
            }
        }

        return tokenResponse;
    }

    @ResponseBody
    @PostMapping(value = "/isValidEmail")
    public Boolean isValidEmail(@RequestBody Members member){

        return !memRepo.findByMemEmail(member.getMemEmail()).isPresent();
    }

    @ResponseBody
    @PostMapping(value = "/isValidPhone")
    public Boolean isValidPhone(@RequestBody Members member){

        return !memRepo.findByMemPhone(member.getMemPhone()).isPresent();
    }

    @ResponseBody
    @PostMapping(value = "/isValidId")
    public Boolean isValidId(@RequestBody Members member){

        return !memRepo.findByMemId(member.getMemId()).isPresent();
    }
}
