# E-commerce Web Application

This project is an e-commerce web application built with React for the frontend and Spring Boot for the backend. It includes features such as user authentication, product browsing, shopping cart functionality, and payment processing using Stripe.

## Features

- User authentication
- Product browsing and searching
- Shopping cart management
- Secure payment processing with Stripe
- Order history

## Technologies Used

### Frontend
- React
- React Router
- Axios for API calls
- Stripe Elements for payment UI
- CSS for styling

### Backend
- Spring Boot
- Stripe API for payment processing

## Key Components
## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- Java Development Kit (JDK) 11 or later
- Maven
- Stripe account for payment processing

### Frontend Setup
1. Clone the repository:
   ```
   git clone https://github.com/KyleWuNTU/amazon-clone.git
   cd [your-project-name]/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend root directory and add your Stripe public key:
   ```
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
   ```

4. Start the development server:
   ```
   npm start
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd ../backend
   ```

2. Create an `application.properties` file in `src/main/resources/` and add your Stripe secret key:
   ```
   stripe.secret.key=your_stripe_secret_key_here
   ```

3. Build the project:
   ```
   mvn clean install
   ```

4. Run the Spring Boot application:
   ```
   mvn spring-boot:run
   ```

## Usage

1. Open a web browser and go to `http://localhost:3000` to access the frontend.
2. Browse products, add items to your cart, and proceed to checkout.
3. Use the following test card for payments:
   - Card number: 4242 4242 4242 4242
   - Expiration date: Any future date
   - CVC: Any 3 digits

## Contributing

We welcome contributions to improve this e-commerce application. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Please ensure your code adheres to the existing style conventions and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.