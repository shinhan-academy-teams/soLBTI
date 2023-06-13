package site.solbti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.solbti.repository.MongoCommonCardRepository;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    MongoCommonCardRepository mongorepo;

    @GetMapping("/benefit/{cno}")
    public Document testReturnDocu(@PathVariable Long cno){

        return null;
    }
}
