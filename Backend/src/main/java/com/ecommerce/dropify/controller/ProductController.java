package com.ecommerce.dropify.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dropify.dto.ProductDto;
import com.ecommerce.dropify.jwt.JwtAuthenticationHelper;
import com.ecommerce.dropify.model.Product;
import com.ecommerce.dropify.service.ProductService;

@RestController
@RequestMapping("/api")
public class ProductController {

	@Autowired
	ProductService productService;
	
	@Autowired
	JwtAuthenticationHelper jwtAuthenticationHelper;
	
	@GetMapping("/products")
	public List<Product> getAllProducts(){
		return productService.getAllProducts();
	}
	
	@GetMapping("/products/{id}")
	public Product getProductById(@PathVariable Long id) {
		return productService.getProductById(id);
	}
	
	@GetMapping("/products/category/{categoryName}")
	public List<Product> getAllProductByCategoryName(@PathVariable String categoryName){
		return productService.getAllProductByCategoryName(categoryName);
	}
	
	@PostMapping("/products")
	public void createProduct(@RequestBody ProductDto productDto) {
		productService.createProduct(productDto);
	}
	
	@PutMapping("/products/{id}")
	public void updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
		productService.updateProduct(id, productDto);
	}
	
	@DeleteMapping("/products/{id}")
	public void deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
	}
	@GetMapping("/getProductDetails/{isSingleProductCheckout}/{productId}")
	public List<Product> getProductDetails(@PathVariable(name="isSingleProductCheckout") boolean isSingleProductCheckout,
			@PathVariable(name="productId")Long productId,@RequestHeader("Authorization") String token) {
		String currentUserName = jwtAuthenticationHelper.getUsernameFromToken(token.substring(7));
		return productService.getProductDetails(isSingleProductCheckout, productId,currentUserName);
	}
	
	@GetMapping("/products/search")
	public List<Product> searchProductsByName(String keyword){
		return productService.searchProducts(keyword);
	}
}
