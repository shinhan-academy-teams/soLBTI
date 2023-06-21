package site.solbti.controller;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import site.solbti.vo.Request;
import site.solbti.vo.SmsResponse;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;


@RestController
@RequiredArgsConstructor
public class smsController {

    @Autowired
    private final SmsService smsService;


    @PostMapping("/user/sms") //
    public ResponseEntity<SmsResponse>  test(@RequestBody Request request)
            throws NoSuchAlgorithmException, URISyntaxException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException {
        SmsResponse data = smsService.sendSms(request.getRecipientPhoneNumber(), request.getContent());
        System.out.println(data+"<<");
        return ResponseEntity.ok().body(data);
    }

    private String generateAuthCode() {
        // 인증번호 생성 로직 구현 (랜덤한 인증번호 생성)
        int authCodeLength = 6;
        StringBuilder authCodeBuilder = new StringBuilder();
        for (int i = 0; i < authCodeLength; i++) {
            int digit = (int) (Math.random() * 10);
            authCodeBuilder.append(digit);
        }
        return authCodeBuilder.toString();
    }
    @PostMapping("/user/request-sms")
    public ResponseEntity<?> requestSms(@RequestBody PhoneNumberRequest request) {
        try {
            String phoneNumber = request.getPhoneNumber();
            // 인증번호 생성 로직 구현
            String authCode = generateAuthCode();
            // SMS 발송
            smsService.sendSms(phoneNumber, authCode);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
    public boolean verifyAuthCode(String userAuthCode, String generatedAuthCode) {
        // 사용자로부터 입력받은 인증번호와 서버에서 생성된 인증번호 비교
        return userAuthCode.equals(generatedAuthCode);
    }
    @PostMapping("/user/verify-sms")
    public ResponseEntity<?> verifySms(@RequestBody SmsVerificationRequest request) {
        try {
            String phoneNumber = request.getPhoneNumber();
            String authCode = request.getAuthCode();
            String authkey = smsService.getAuthkey();
            // 인증번호 검증 로직 구현
            boolean isCodeValid = verifyAuthCode(authCode, authkey);
            if (isCodeValid) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
//@RestController
//@RequiredArgsConstructor
//public class SmsController {
//
//    private final SmsService smsService;
//
////    @PostMapping("/user/sms") //
////    public ResponseEntity<SmsResponse>  test(@RequestBody Request request)
////            throws NoSuchAlgorithmException, URISyntaxException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException {
//////        SmsResponse data = smsService.sendSms(request.getRecipientPhoneNumber(), request.getContent());
////        System.out.println(request.getContent()+"<<");
////       return ResponseEntity.ok().body(data);
////    }
//
//    @PostMapping("/user/sms") //
//    public void  test(@RequestBody Request request)
//            throws NoSuchAlgorithmException, URISyntaxException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException {
////        SmsResponse data = smsService.sendSms(request.getRecipientPhoneNumber(), request.getContent());
//        System.out.println(request.getContent()+"<<");
//
//    }
//}