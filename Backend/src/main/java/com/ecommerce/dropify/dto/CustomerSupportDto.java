package com.ecommerce.dropify.dto;


import org.springframework.web.multipart.MultipartFile;

import lombok.Data;


@Data
public class CustomerSupportDto {

	private Long id;
	
	
	private String username;
	
	
	private String contactInfo;
	
	
	private String query;
	
	private MultipartFile queryImg;
}

