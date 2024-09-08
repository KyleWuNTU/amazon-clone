package com.example.demo.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> payload) {
        Stripe.apiKey = stripeSecretKey;

        try {
            int amount = (int) payload.get("amount");
            Map<String, Object> params = new HashMap<>();
            params.put("amount", amount);
            params.put("currency", "usd");
            params.put("payment_method_types", new String[]{"card"});

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}