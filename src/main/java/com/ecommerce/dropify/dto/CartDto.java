package com.ecommerce.dropify.dto;

import java.math.BigDecimal;
import java.util.List;


import com.ecommerce.dropify.model.Product;
import com.ecommerce.dropify.model.User;


import lombok.Data;

@Data
public class CartDto {


	private Long id;
	private User user;
	
	private List<Product> products;
}
