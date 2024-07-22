package com.ecommerce.dropify.controller;

import com.ecommerce.dropify.dto.CustomerSupportDto;
import com.ecommerce.dropify.service.CustomerSupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class CustomerSupportController {

    @Autowired
    private CustomerSupportService customerSupportService;

    @PostMapping("/addQuery")
    public void addQuery(@RequestPart("username") String username,
                         @RequestPart("contactInfo") String contactInfo,
                         @RequestPart("query") String query,
                         @RequestPart(value = "queryImg", required = false) MultipartFile queryImg) throws IOException {

        if (username == null || username.trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        if (contactInfo == null || contactInfo.trim().isEmpty()) {
            throw new RuntimeException("Contact info is required");
        }
        if (query == null || query.trim().isEmpty()) {
            throw new RuntimeException("Query is required");
        }

        CustomerSupportDto customerSupportDto = new CustomerSupportDto();
        customerSupportDto.setUsername(username);
        customerSupportDto.setContactInfo(contactInfo);
        customerSupportDto.setQuery(query);
        customerSupportDto.setQueryImg(queryImg); // assuming CustomerSupportDto has appropriate setters

        customerSupportService.addQuery(customerSupportDto);
    }
}
