package com.ecommerce.dropify.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.dropify.model.Cart;
import com.ecommerce.dropify.model.Product;
import com.ecommerce.dropify.model.User;
import java.util.List;
import java.util.Optional;
@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {

	public List<Cart> findByUser(User user);
	
	Optional<Cart> findByproducts(List<Product> product);
}
