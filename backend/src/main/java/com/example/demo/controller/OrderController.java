package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.service.OrderService;
import com.example.demo.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final JwtUtil jwtUtil;

    public OrderController(OrderService orderService, JwtUtil jwtUtil) {
        this.orderService = orderService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(@RequestHeader("Authorization") String token) {
        String userEmail = extractUserEmailFromToken(token);
        List<Order> orders = orderService.getAllOrdersForUser(userEmail);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        String userEmail = extractUserEmailFromToken(token);
        return orderService.getOrderByIdAndUser(id, userEmail)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order, @RequestHeader("Authorization") String token) {
        String userEmail = extractUserEmailFromToken(token);
        order.setUserEmail(userEmail);
        Order createdOrder = orderService.createOrder(order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails, @RequestHeader("Authorization") String token) {
        String userEmail = extractUserEmailFromToken(token);
        Order updatedOrder = orderService.updateOrder(id, orderDetails, userEmail);
        return updatedOrder != null ? ResponseEntity.ok(updatedOrder) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        String userEmail = extractUserEmailFromToken(token);
        boolean deleted = orderService.deleteOrder(id, userEmail);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    private String extractUserEmailFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return jwtUtil.extractUsername(token);
    }
}