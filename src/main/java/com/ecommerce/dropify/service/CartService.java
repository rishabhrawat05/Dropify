package com.ecommerce.dropify.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

import com.ecommerce.dropify.dto.CartDto;
import com.ecommerce.dropify.exception.CartNotExists;
import com.ecommerce.dropify.exception.ProductNotExists;
import com.ecommerce.dropify.exception.UserNotFound;
import com.ecommerce.dropify.model.Cart;
import com.ecommerce.dropify.model.Product;
import com.ecommerce.dropify.model.User;
import com.ecommerce.dropify.repository.CartRepository;
import com.ecommerce.dropify.repository.ProductRepository;
import com.ecommerce.dropify.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;
    
    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;
    
    public Cart createNewCart(Long productId, String currentUserName) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()) {
            throw new ProductNotExists("Product not Exists");
        }
        
        Optional<User> user = userRepository.findByUsername(currentUserName);
        if (user.isEmpty()) {
            throw new UserNotFound("User not found");
        }
        
        Product cartProduct = product.get();
        User cartUser = user.get();
        
        Cart cart = new Cart();
        cart.setUser(cartUser);
        
        List<Product> cartProducts = new ArrayList<>();
        cartProducts.add(cartProduct);
        cart.setProducts(cartProducts);
        
        return cartRepository.save(cart);
    }
    public Cart getCartById(Long id) {
        Optional<Cart> cart = cartRepository.findById(id);
        if (cart.isEmpty()) {
            throw new UserNotFound("Sorry User Not Found Based on id: " + id);
        }
        return cart.get();
    }
    
    public void updateCart(Long cartId, CartDto cartDto) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isEmpty()) {
            throw new UserNotFound("Sorry! User Not Found Based on id: " + cartId);
        }
        Cart updatedCart = cart.get();
        updatedCart.setProducts(cartDto.getProducts());
        updatedCart.setUser(cartDto.getUser());
        cartRepository.save(updatedCart);
    }

    public void deleteCart(@PathVariable Long cartId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isEmpty()) {
            throw new UserNotFound("Sorry! User Not Found Based on id: " + cartId);
        }
        cartRepository.delete(cart.get());
    }
    
    public List<Cart> getCartByUser(String username){
    	Optional<User> user=userRepository.findByUsername(username);
    	if(user.isEmpty()) {
    		throw new UserNotFound("User not found");
    	}
    	User cart_user=user.get();
    	return cartRepository.findByUser(cart_user);
    }
    
    public void removeProductFromCart(Long productId) {
    	Optional<Product> Optproduct=productRepository.findById(productId);
    	if(Optproduct.isEmpty()) {
    		throw new ProductNotExists("Product not Exists");
    	}
    	Product product=Optproduct.get();
    	List<Product> list=new ArrayList<>();
    	list.add(product);
    	Optional<Cart> Optcart=cartRepository.findByproducts(list);
    	if(Optcart.isEmpty()) {
    		throw new CartNotExists("Cart not Exists");
    	}
    	Cart cart=Optcart.get();
    	cartRepository.delete(cart);
    }
}
