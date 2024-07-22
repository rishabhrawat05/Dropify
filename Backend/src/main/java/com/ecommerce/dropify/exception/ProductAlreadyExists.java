package com.ecommerce.dropify.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProductAlreadyExists extends RuntimeException {

	public ProductAlreadyExists(String message) {
		super(message);
	}
}
