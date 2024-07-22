
# Dropify - Your Ultimate E-commerce Solution! 🛒✨

🚀 Excited to introduce Dropify - the all-in-one platform designed to elevate your online shopping experience!

## Features

- **Register and Login:** Seamless user registration and secure login.
- **Search Products:** Easily find what you need.
- **Add to Cart & Remove from Cart:** Effortlessly manage your cart items.
- **Buy Products:** Simple and secure checkout process.
- **Cart Checkout:** Streamlined and efficient checkout experience.
- **Product Categories & Discounts:** Browse products by categories and enjoy exclusive discounts.
- **Contact Support:** Get your queries answered with our responsive support team.
- **Pagination:** Smooth navigation through product listings.

## Technologies Used

- **Spring Boot:** For robust backend services.
- **React.js:** For a dynamic and responsive user interface.
- **Eureka Server:** For service discovery and registration.
- **MySQL:** For reliable data management.
- **Postman:** For API testing and integration.

## Languages Used

- **Java**

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js and npm
- MySQL
- Postman (for API testing)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/dropify.git
   cd dropify
   ```

2. **Backend Setup:**

   - Navigate to the `backend` directory:

     ```sh
     cd backend
     ```

   - Configure the database connection in `application.yml`:

     ```yaml
     spring:
       datasource:
         url: jdbc:mysql://localhost:3306/dropify?createDatabaseIfNotExist=true
         username: root
         password: yourpassword
         driver-class-name: com.mysql.cj.jdbc.Driver
       jpa:
         hibernate:
           ddl-auto: update
       application:
         name: dropify

     eureka:
       client:
         serviceUrl:
           defaultZone: http://localhost:8085/eureka

     security:
       jwt:
         secret-key: your-secret-key
         expiration-time: 3600000

     servlet:
       multipart:
         enabled: true
         max-file-size: 2MB
         max-request-size: 2MB
     ```

   - Run the Spring Boot application:

     ```sh
     ./mvnw spring-boot:run
     ```

3. **Frontend Setup:**

   - Navigate to the `Frontend` directory:

     ```sh
     cd ../Frontend
     ```

   - Install dependencies:

     ```sh
     npm install
     ```

   - Start the React application:

     ```sh
     npm start
     ```

4. **Eureka Server Setup:**

   - Navigate to the `eureka-server` directory:

     ```sh
     cd ../eureka-server
     ```

   - Run the Eureka Server:

     ```sh
     ./mvnw spring-boot:run
     ```

### Usage

- Open your browser and navigate to `http://localhost:3000` to access the Dropify Frontend.
- Use Postman to interact with the backend APIs for testing and integration.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
