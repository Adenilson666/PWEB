package com.arllansantana.springbootjwtauth.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String cpf;

    @NotBlank
    private String password;
}