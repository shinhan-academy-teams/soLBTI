package site.solbti.vo;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class SmsResponse {
    String requestId;
    LocalDateTime requestTime;
    String statusCode;
    String statusName;
}