package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 創建或更新產品
    @Transactional
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // 查找所有產品
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 通過 ID 查找產品
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // 刪除產品
    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}