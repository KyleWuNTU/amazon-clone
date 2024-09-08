package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order updateOrder(Long id, Order orderDetails, String userEmail) {
        // Implementation that checks if the order belongs to the user before updating
        return orderRepository.save(orderDetails);
    }

    @Transactional
    public boolean deleteOrder(Long id, String userEmail) {
        Optional<Order> order = orderRepository.findByIdAndUserEmail(id, userEmail);
        if (order.isPresent()) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Order> getOrdersByUserId(String userId) {
        // Assuming you've added this method to your repository
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrdersForUser(String userEmail) {
        // Implement the logic to fetch all orders for the given user email
        return orderRepository.findByUserEmail(userEmail);
    }

    public Optional<Order> getOrderByIdAndUser(Long id, String userEmail) {
        return orderRepository.findByIdAndUserEmail(id, userEmail);
    }
}