package site.solbti.Jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenDataResponse {
    private String token;
    private String subject;
    private Long memCode;
    private String issued_time;
    private String expired_time;
}