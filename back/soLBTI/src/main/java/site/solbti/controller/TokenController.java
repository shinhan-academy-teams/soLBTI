package site.solbti.controller;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import site.solbti.Jwt.JwtProvider;
import site.solbti.Jwt.TokenDataResponse;
import site.solbti.Jwt.TokenResponse;
import site.solbti.Jwt.TokenResponseNoData;

@RestController
@RequiredArgsConstructor
public class TokenController {
    private final JwtProvider jwtProvider;

    //==토큰 생성 컨트롤러==//
    @GetMapping(value = "/tokenCreate/{userId}")
    public TokenResponse createToken(@PathVariable("userId") String userId) throws Exception {
        String token = jwtProvider.createToken(userId); // 토큰 생성
        Claims claims = jwtProvider.parseJwtToken("Bearer "+ token); // 토큰 검증

        TokenDataResponse tokenDataResponse = new TokenDataResponse(token, claims.getSubject(), 99L ,claims.getIssuedAt().toString(), claims.getExpiration().toString());
        TokenResponse tokenResponse = new TokenResponse("200", "OK", tokenDataResponse);

        return tokenResponse;
    }

    //==토큰 인증 컨트롤러==//
    @GetMapping(value = "/checktoken")
    public TokenResponseNoData checkToken(@RequestHeader(value = "Authorization") String token) throws Exception {
        Claims claims = jwtProvider.parseJwtToken(token);

        TokenResponseNoData tokenResponseNoData = new TokenResponseNoData("200", "success");
        return tokenResponseNoData;
    }

    //==Response DTO==//
//    @Data
//    @AllArgsConstructor
//    static class TokenResponse<T> {
//
//        private String code;
//        private String msg;
//        private T data;
//    }
//
//    //==Response DTO==//
//    @Data
//    @AllArgsConstructor
//    static class TokenResponseNoData<T> {
//
//        private String code;
//        private String msg;
//    }
//
//    //==Response DTO==//
//    @Data
//    @AllArgsConstructor
//    static class TokenDataResponse {
//        private String token;
//        private String subject;
//        private String issued_time;
//        private String expired_time;
//    }
}
