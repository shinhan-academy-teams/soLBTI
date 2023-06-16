package site.solbti.vo;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class SmsRequest {
    String type;
    String contentType;
    String countryCode;
    String from;
    String content;
    List<Message> messages;

}