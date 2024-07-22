package com.ecommerce.dropify.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dropify.dto.UserDto;
import com.ecommerce.dropify.model.User;
import com.ecommerce.dropify.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")

public class UserController {

	@Autowired
	UserService userService;
	
	@PostMapping("/user/register")
	public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
		UserDto registeredUser=this.userService.createUser(userDto);
		return new ResponseEntity<UserDto>(registeredUser,HttpStatus.CREATED);
	}
	@GetMapping("/user/{id}")
	public User getUserById(@PathVariable Long id) {
		return userService.getUserById(id);
	}
	@GetMapping("/user/all")
	public List<User> getAllUser(){
		return userService.getAllUser();
	}
	@PutMapping("/user/update")
	public void updateUser(@RequestBody UserDto userDto) {
		userService.updateUser(userDto);
	}
	@DeleteMapping("/user/delete/{id}")
	public void deleteUserById(@PathVariable Long id) {
		userService.deleteUserById(id);
	}
	
}
