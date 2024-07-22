package com.ecommerce.dropify.model;

import java.math.BigDecimal;



import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Product {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private BigDecimal price;

    @NotNull
    private String description;
    
    @NotNull
    private String image;
    
    @NotNull
    private String categoryname;
    
    private int discountPercent;
    
    

}
