package com.ecommerce.dropify.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDto {
	
	private UserDto user;
	
	private String token;
	
}

