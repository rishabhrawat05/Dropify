package com.ecommerce.dropify.model;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity

@Table(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String orderFullName;
	
	private String orderFullAddress;
	
	private String orderContactNumber;
	
	private String orderAlternateContactNumber;
	
	private String orderStatus;
	
	private BigDecimal orderAmount;
	
	@ManyToOne
	 @JoinColumn(name = "product_id")
	private Product product;
	 @ManyToOne
	 @JoinColumn(name = "user_id")
	private User user;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getOrderFullName() {
		return orderFullName;
	}
	public void setOrderFullName(String orderFullName) {
		this.orderFullName = orderFullName;
	}
	public String getOrderFullOrder() {
		return orderFullAddress;
	}
	public void setOrderFullOrder(String orderFullAddress) {
		this.orderFullAddress = orderFullAddress;
	}
	public String getOrderContactNumber() {
		return orderContactNumber;
	}
	public void setOrderContactNumber(String orderContactNumber) {
		this.orderContactNumber = orderContactNumber;
	}
	public String getOrderAlternateContactNumber() {
		return orderAlternateContactNumber;
	}
	public void setOrderAlternateContactNumber(String orderAlternateContactNumber) {
		this.orderAlternateContactNumber = orderAlternateContactNumber;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public BigDecimal getOrderAmount() {
		return orderAmount;
	}
	public void setOrderAmount(BigDecimal orderAmount) {
		this.orderAmount = orderAmount;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Order() {
	 }
	
	public Order(String orderFullName, String orderFullAddress, String orderContactNumber,
			String orderAlternateContactNumber, String orderStatus, BigDecimal orderAmount, Product product,
			User user) {
		this.orderFullName = orderFullName;
		this.orderFullAddress = orderFullAddress;
		this.orderContactNumber = orderContactNumber;
		this.orderAlternateContactNumber = orderAlternateContactNumber;
		this.orderStatus = orderStatus;
		this.orderAmount = orderAmount;
		this.product = product;
		this.user = user;
	}
	
	

}