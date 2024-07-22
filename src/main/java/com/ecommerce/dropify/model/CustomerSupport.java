package com.ecommerce.dropify.model;



import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.NonNull;

@Entity
public class CustomerSupport {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NonNull
	private String username;
	
	@NonNull
	private String contactInfo;
	
	@NonNull
	private String query;
	
	@Column(length=50000000)
	@Lob
	private String queryImg;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getContactInfo() {
		return contactInfo;
	}

	public void setContactInfo(String contactInfo) {
		this.contactInfo = contactInfo;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public String getQueryImg() {
		return queryImg;
	}

	public void setQueryImg(String queryImg) {
		this.queryImg = queryImg;
	}
	
	public CustomerSupport() {
		
	}
}
