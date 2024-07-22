package com.ecommerce.dropify.dto;



import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {
	private Long id;
	
	@Size(min=4,message="Name should be minimum of 4 characters")
	private String name;
	
	@Size(min=3,max=10,message="Password should be of 3-10 characters")
	private String password;
	
	@Email(message="Email is not Valid")
	@NotEmpty
	private String email;
	
	@Size(min=3,max=10,message="Username should be unique and between 3-10 characters")
	private String username;
	
	
}
