package com.ecommerce.dropify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.dropify.model.Cart;
import com.ecommerce.dropify.model.Order;
import com.ecommerce.dropify.model.User;
@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

	public List<Order> findByUser(User user);
	
}
