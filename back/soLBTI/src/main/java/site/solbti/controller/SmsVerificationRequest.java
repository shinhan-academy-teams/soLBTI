package site.solbti.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SmsVerificationRequest {
    private String phoneNumber;
    private String authCode;
}