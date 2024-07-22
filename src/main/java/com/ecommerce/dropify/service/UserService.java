package com.ecommerce.dropify.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.dropify.dto.UserDto;
import com.ecommerce.dropify.exception.UserAlreadyExists;
import com.ecommerce.dropify.exception.UserNotFound;
import com.ecommerce.dropify.model.User;
import com.ecommerce.dropify.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public UserDto createUser(UserDto userDto) {
		
		if(userRepository.findByEmail(userDto.getEmail()).isPresent()) {
			throw new UserAlreadyExists("Sorry user already exists");
		}
		if(userRepository.findByUsername(userDto.getUsername()).isPresent()) {
			throw new UserAlreadyExists("Sorry user already exists");
		}
		BCryptPasswordEncoder bCryptPasswordEncoder=new BCryptPasswordEncoder();
		String encodedPassword=bCryptPasswordEncoder.encode(userDto.getPassword());
		User new_user=new User();
		new_user.setEmail(userDto.getEmail());
		new_user.setName(userDto.getName());
		new_user.setPassword(encodedPassword);
		new_user.setUsername(userDto.getUsername());
		userRepository.save(new_user);
		
		return userDto;
	}
	
	public User getUserById(Long id) {
		Optional<User> user=userRepository.findById(id);
		if(user.isEmpty()) {
			throw new UserNotFound("Sorry User Not Exists");
		}
		return user.get();
	}
	
	public List<User> getAllUser(){
		return userRepository.findAll();
	}
	
	public void updateUser(UserDto userDto) {
		Optional<User> user=userRepository.findById(userDto.getId());
		if(user.isEmpty()) {
			throw new UserNotFound("Sorry User Not Exists");
		}
		User update_user=user.get();
		update_user.setEmail(userDto.getEmail());
		update_user.setName(userDto.getName());
		update_user.setPassword(userDto.getPassword());
		update_user.setUsername(userDto.getUsername());
		userRepository.save(update_user);
	}
	
	public void deleteUserById(Long id) {
		Optional<User> user=userRepository.findById(id);
		if(user.isEmpty()) {
			throw new UserNotFound("Sorry User Not Exists");
		}
		userRepository.delete(user.get());
	}
}
