package com.ecommerce.dropify.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CartNotExists extends RuntimeException{

	public CartNotExists(String message) {
		super(message);
	}

	
}
