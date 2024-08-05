/* Only for tesing purpose

package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize your data here
        Product product = new Product();
        product.setName("Sample Product");
        product.setDescription("This is a sample product.");
        product.setPrice(19.99);
        product.setStock(100);

        productRepository.save(product);
    }
}
 */


