package com.ecommerce.dropify.dto;


import java.math.BigDecimal;

import lombok.Data;

@Data
public class ProductDto {
	
	private Long id;
	
	private String name;
	
	private BigDecimal price;
	
	private String description;
	
	private String image;
	
	private String categoryname;
	
	private int discountPercent;
}
