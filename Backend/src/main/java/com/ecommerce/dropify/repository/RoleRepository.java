package com.ecommerce.dropify.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.dropify.model.Roles;


@Repository
public interface RoleRepository extends JpaRepository<Roles,Long> {

	Optional<Roles> findByName(String name);
}
