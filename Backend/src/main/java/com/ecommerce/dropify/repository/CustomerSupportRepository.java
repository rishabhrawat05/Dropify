package com.ecommerce.dropify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.dropify.model.CustomerSupport;

public interface CustomerSupportRepository extends JpaRepository<CustomerSupport, Long> {

}
