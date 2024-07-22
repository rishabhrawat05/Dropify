package com.ecommerce.dropify.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dropify.jwt.JwtAuthenticationHelper;
import com.ecommerce.dropify.model.Order;
import com.ecommerce.dropify.model.OrderInput;
import com.ecommerce.dropify.service.OrderService;

@RestController
@RequestMapping("/api")
public class OrderController {

	@Autowired
	OrderService orderService;
	
	@Autowired
	JwtAuthenticationHelper jwtAuthenticationHelper;
	
	@PostMapping("/placeOrder/{isSingleProductCheckout}")
	public void placeOrder(@RequestBody OrderInput orderInput,@RequestHeader("Authorization") String token,@PathVariable(name="isSingleProductCheckout") boolean isSingleProductCheckout) {
		String currentUserName = jwtAuthenticationHelper.getUsernameFromToken(token.substring(7));
		orderService.placeOrder(orderInput,currentUserName,isSingleProductCheckout);
	}
	
//	@GetMapping("/orders/get")
//	public List<Order> getAllOrders(){
//		return orderService.getAllOrders();
//	}
	@GetMapping("/orders/get/{userId}")
	public List<Order> getOrderByUserId(@PathVariable(name="userId") Long userId) {
		return orderService.getOrderByUserId(userId);
	}
//	
//	@GetMapping("/orders/{id}/summary")
//	public List<String> getOrderSummary(@PathVariable Long id) {
//		return orderService.getOrderSummary(id);
//		
//	}
}
