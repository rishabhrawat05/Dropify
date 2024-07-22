package com.ecommerce.dropify.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.dropify.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	Optional<Product> findByName(String name);
	
	List<Product> findAllByCategoryname(String categoryname);
	
	 @Query("SELECT p FROM Product p WHERE " +
	           "p.name LIKE %:keyword% OR " +
	           "p.categoryname LIKE %:keyword% OR " +
	           "p.description LIKE %:keyword%")
	List<Product> searchProducts(@Param("keyword") String keyword);
	
	
}
