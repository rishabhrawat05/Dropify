package com.ecommerce.dropify.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dropify.dto.LoginRequestDto;
import com.ecommerce.dropify.dto.LoginResponseDto;

import com.ecommerce.dropify.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthService authService;

	public AuthController(AuthService authService) {
		this.authService=authService;
		}
	@PostMapping("/signin")
	public ResponseEntity<LoginResponseDto> authenticateUser(@Valid @RequestBody LoginRequestDto logindto) {
		return new ResponseEntity<>(authService.authenticateUser(logindto),HttpStatus.OK);
	}
	
}
