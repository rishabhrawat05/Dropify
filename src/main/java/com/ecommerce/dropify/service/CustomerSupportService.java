package com.ecommerce.dropify.service;

import com.ecommerce.dropify.dto.CustomerSupportDto;
import com.ecommerce.dropify.exception.UserNotFound;
import com.ecommerce.dropify.model.CustomerSupport;
import com.ecommerce.dropify.model.User;
import com.ecommerce.dropify.repository.CustomerSupportRepository;
import com.ecommerce.dropify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerSupportService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerSupportRepository customerSupportRepository;

    @Value("${upload.dir}")
    private String uploadDirectory;

    public void addQuery(CustomerSupportDto customerSupportDto) throws IOException {
        Optional<User> userOpt = userRepository.findByUsername(customerSupportDto.getUsername());
        if (userOpt.isEmpty()) {
            throw new UserNotFound("User not found");
        }
        User user = userOpt.get();

        CustomerSupport customerSupport = new CustomerSupport();
        customerSupport.setUsername(customerSupportDto.getUsername());
        customerSupport.setContactInfo(customerSupportDto.getContactInfo());
        customerSupport.setQuery(customerSupportDto.getQuery());

        if (customerSupportDto.getQueryImg() != null && !customerSupportDto.getQueryImg().isEmpty()) {
            String filename = UUID.randomUUID().toString() + "-" + customerSupportDto.getQueryImg().getOriginalFilename();
            File uploadRootDir = new File(uploadDirectory);
            if (!uploadRootDir.exists()) {
                uploadRootDir.mkdirs();
            }
            File file = new File(uploadRootDir, filename);
            customerSupportDto.getQueryImg().transferTo(file); 
            customerSupport.setQueryImg(filename);
        }

        customerSupportRepository.save(customerSupport);
    }
}
