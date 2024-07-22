package com.ecommerce.dropify.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserAlreadyExists extends RuntimeException{

	public UserAlreadyExists(String message) {
		super(message);
	}
}
