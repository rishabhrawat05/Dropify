package com.ecommerce.dropify.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dropify.dto.CartDto;
import com.ecommerce.dropify.jwt.JwtAuthenticationHelper;
import com.ecommerce.dropify.model.Cart;
import com.ecommerce.dropify.service.CartService;
import java.util.List;
@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	CartService cartService;
	
	@Autowired
	JwtAuthenticationHelper jwtAuthenticationHelper;
	
	@Autowired
    public CartController(JwtAuthenticationHelper jwtAuthenticationHelper, CartService cartService) {
        this.jwtAuthenticationHelper=jwtAuthenticationHelper;
        this.cartService = cartService;
    }
	
	@GetMapping("/add/{productId}")
	public Cart createNewCart(@PathVariable(name="productId") Long productId ,@RequestHeader("Authorization") String token) {
		String currentUserName = jwtAuthenticationHelper.getUsernameFromToken(token.substring(7));
		return cartService.createNewCart(productId,currentUserName);
	}
	
	@GetMapping("/get/{id}")
	public Cart getCartById(@PathVariable Long id) {
		return cartService.getCartById(id);
	}
	@GetMapping("/get/user")
	public List<Cart> getCartByUser(@RequestHeader("Authorization") String token) {
		String currentUserName = jwtAuthenticationHelper.getUsernameFromToken(token.substring(7));
		return cartService.getCartByUser(currentUserName);
	}
	
	@PutMapping("/update/{cartItemId}")
	public void updateCart(@PathVariable Long cartItemId,@RequestBody CartDto cartDto ) {
		cartService.updateCart(cartItemId, cartDto);
	}
	@DeleteMapping("/delete/{cartItemId}")
	public void deleteCart(@PathVariable Long cartItemId) {
		cartService.deleteCart(cartItemId);
	}
	
	@DeleteMapping("/delete/product/{productId}")
	public void removeProductFromCart(@PathVariable(name="productId") Long productId) {
		cartService.removeProductFromCart(productId);
	}
}
