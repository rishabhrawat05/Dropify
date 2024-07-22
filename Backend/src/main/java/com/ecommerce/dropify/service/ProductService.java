package com.ecommerce.dropify.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.ecommerce.dropify.dto.ProductDto;
import com.ecommerce.dropify.exception.ProductAlreadyExists;
import com.ecommerce.dropify.exception.ProductNotExists;
import com.ecommerce.dropify.exception.UserNotFound;
import com.ecommerce.dropify.jwt.JwtAuthenticationFilter;
import com.ecommerce.dropify.model.Cart;
import com.ecommerce.dropify.model.Product;
import com.ecommerce.dropify.model.User;
import com.ecommerce.dropify.repository.CartRepository;
import com.ecommerce.dropify.repository.ProductRepository;
import com.ecommerce.dropify.repository.UserRepository;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	CartRepository cartRepository;
	
	

	

	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	public Product getProductById(Long id) {
		Optional<Product> product = productRepository.findById(id);
		if (product.isEmpty()) {
			throw new ProductNotExists("Sorry Product Not Exists");
		}
		return product.get();
	}

	public List<Product> getAllProductByCategoryName( String categoryName) {
		return productRepository.findAllByCategoryname(categoryName);	
	}

	public void createProduct(ProductDto productDto) {
		Optional<Product> product = productRepository.findByName(productDto.getName());
		if (product.isPresent()) {
			throw new ProductAlreadyExists("Sorry Product Already Exists");
		}
		Product new_product = new Product();
		new_product.setDescription(productDto.getDescription());
		new_product.setName(productDto.getName());
		new_product.setPrice(productDto.getPrice());
		new_product.setImage(productDto.getImage());
		new_product.setCategoryname(productDto.getCategoryname());
		new_product.setDiscountPercent(productDto.getDiscountPercent());
		
		productRepository.save(new_product);
	}

	public void updateProduct(Long id, ProductDto productDto) {
		Optional<Product> product = productRepository.findById(id);
		if (product.isEmpty()) {
			throw new ProductNotExists("Sorry Product Not Exists");
		}
		Product update_product = product.get();
		update_product.setDescription(productDto.getDescription());
		update_product.setName(productDto.getName());
		update_product.setPrice(productDto.getPrice());
		update_product.setImage(productDto.getImage());
		update_product.setDiscountPercent(productDto.getDiscountPercent());		
		productRepository.save(update_product);
	}

	public void deleteProduct(Long id) {
		Optional<Product> product = productRepository.findById(id);
		if (product.isEmpty()) {
			throw new ProductNotExists("Sorry Product Not Exists");
		}
		Product delete_product = product.get();
		productRepository.delete(delete_product);

	}
	
	public List<Product> getProductDetails(boolean isSingleProductCheckout, Long productId,String currentUserName) {
		if(isSingleProductCheckout && productId!=0) {
			List<Product> list=new ArrayList<>();
			Optional<Product> Optproduct=productRepository.findById(productId);
			if(Optproduct.isEmpty()) {
				throw new ProductNotExists("Product Not Exists");
			}
			Product product=Optproduct.get(); 
			list.add(product);
			return list;
		}
		else {
			Optional<User> Optuser=userRepository.findByUsername(currentUserName);
			if(Optuser.isEmpty()) {
				throw new UserNotFound("User Not Found");
				
			}
			User user=Optuser.get();
			List<Cart> carts=cartRepository.findByUser(user);
			List<Product> product=new ArrayList<>();
			for(Cart c:carts) {
				for(Product p:c.getProducts()) {
					product.add(p);
				}
			}
			return product;
			
			
		}
		
	}
	public List<Product> searchProducts(String keyword) {
		return productRepository.searchProducts(keyword);
	    
	  
	}

}
