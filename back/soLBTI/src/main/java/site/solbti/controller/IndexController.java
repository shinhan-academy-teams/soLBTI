package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import site.solbti.repository.MembersRepository;
import site.solbti.repository.PaymentHistoryRepository;
import site.solbti.vo.PersonalCard;

import java.util.*;
import java.util.stream.Collectors;

@Controller
public class IndexController {
    @GetMapping({"","/"})
    public String index(){
        return "index";
    }
}
