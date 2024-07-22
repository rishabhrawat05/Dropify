package com.ecommerce.dropify.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dropify.exception.UserNotFound;
import com.ecommerce.dropify.model.Cart;
import com.ecommerce.dropify.model.Order;
import com.ecommerce.dropify.model.OrderInput;
import com.ecommerce.dropify.model.OrderProductQuantity;
import com.ecommerce.dropify.model.Product;
import com.ecommerce.dropify.model.User;
import com.ecommerce.dropify.repository.CartRepository;
import com.ecommerce.dropify.repository.OrderRepository;
import com.ecommerce.dropify.repository.ProductRepository;
import com.ecommerce.dropify.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CartRepository cartRepository;
    
    private static final String ORDER_PLACED = "Placed";
    
    public void placeOrder(OrderInput orderInput, String currentUserName, boolean isSingleProductCheckout) {
        List<OrderProductQuantity> orderProductQuantityList = orderInput.getOrderProductQuantityList();
        
        Optional<User> optUser = userRepository.findByUsername(currentUserName);
        if (optUser.isEmpty()) {
            throw new UserNotFound("User not found");
        }
        
        User user = optUser.get();
        
        for (OrderProductQuantity op : orderProductQuantityList) {
            Product product = productRepository.findById(op.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found"));
            
            BigDecimal discount = BigDecimal.valueOf(product.getDiscountPercent()).divide(BigDecimal.valueOf(100));
            BigDecimal discountedPrice = product.getPrice().subtract(product.getPrice().multiply(discount));
            discountedPrice = BigDecimal.valueOf(Math.floor(discountedPrice.doubleValue()));
            BigDecimal totalPrice = discountedPrice.multiply(BigDecimal.valueOf(op.getQuantity()));
            
            Order order = new Order(
                    orderInput.getFullName(),
                    orderInput.getFullAddress(),
                    orderInput.getContactNumber(),
                    orderInput.getAlternateContactNumber(),
                    ORDER_PLACED,
                    totalPrice,
                    product,
                    user
            );
            
            orderRepository.save(order);
        }
        
        if (!isSingleProductCheckout) {
            List<Cart> carts = cartRepository.findByUser(user);
            cartRepository.deleteAll(carts);
        }
    }

    public List<Order> getOrderByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound("User not found"));
        
        return orderRepository.findByUser(user);
    }
}
