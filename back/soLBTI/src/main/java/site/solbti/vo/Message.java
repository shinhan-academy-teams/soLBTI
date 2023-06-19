package site.solbti.vo;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Message {
    String to;
    String content;
}