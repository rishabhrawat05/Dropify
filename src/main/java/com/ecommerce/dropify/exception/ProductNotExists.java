package com.ecommerce.dropify.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ProductNotExists extends RuntimeException{

	public ProductNotExists(String message) {
		super(message);
	}
}
