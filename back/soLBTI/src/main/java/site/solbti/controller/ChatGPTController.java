package site.solbti.controller;

import io.github.flashvayne.chatgpt.service.ChatgptService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat-gpt")
public class ChatGPTController {
    private final ChatgptService chatgptService;

    @PostMapping("/ask")
    public String test(@RequestBody String question){
        return chatgptService.sendMessage(question);
    }
}
