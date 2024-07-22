package com.ecommerce.dropify.service;



import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.dropify.dto.LoginRequestDto;
import com.ecommerce.dropify.dto.LoginResponseDto;
import com.ecommerce.dropify.dto.UserDto;
import com.ecommerce.dropify.jwt.JwtAuthenticationHelper;
import com.ecommerce.dropify.model.User;
import com.ecommerce.dropify.repository.UserRepository;



@Service
public class AuthService {
	@Autowired
	UserRepository userRepository;
	PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	JwtAuthenticationHelper jwtHelper;
	@Autowired
	UserDetailsService userDetailsService;
	public LoginResponseDto authenticateUser(LoginRequestDto loginRequestDto) {
		this.doAuthenticate(loginRequestDto.getUsername(),loginRequestDto.getPassword());
		UserDetails userDetails=userDetailsService.loadUserByUsername(loginRequestDto.getUsername());
		String token=jwtHelper.generateToken(userDetails);
		LoginResponseDto response=LoginResponseDto.builder().token(token).build();
		UserDto userDto=new UserDto();
		Optional<User> use=userRepository.findByUsername(loginRequestDto.getUsername());
		User user=use.get();
		userDto.setEmail(user.getEmail());
		userDto.setName(user.getName());
		userDto.setUsername(user.getUsername());
		userDto.setId(user.getId());
		response.setUser(userDto);
		return response;
	}
	public void doAuthenticate(String username,String password) {
		UsernamePasswordAuthenticationToken authenticateToken=new UsernamePasswordAuthenticationToken(username, password);
		try {
			authenticationManager.authenticate(authenticateToken);
		}
		catch(BadCredentialsException e){
			throw new BadCredentialsException("Invalid Username or Password");
		}
	}
	
}

