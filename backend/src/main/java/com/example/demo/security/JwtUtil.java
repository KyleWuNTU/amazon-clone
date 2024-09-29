package com.example.demo.security;

import io.jsonwebtoken.Claims; // Claims are the data stored in the JWT
import io.jsonwebtoken.Jwts; // Jwts is the class that provides methods to create and parse JWT
import io.jsonwebtoken.SignatureAlgorithm; // SignatureAlgorithm is the algorithm used to sign the JWT
import io.jsonwebtoken.security.Keys; // Keys is the class that provides methods to generate keys

import org.springframework.security.core.userdetails.UserDetails; // UserDetails is the interface that represents a user in the system
import org.springframework.stereotype.Component; // Component is a Spring annotation that marks the class as a Spring bean

import java.nio.charset.StandardCharsets; // StandardCharsets is the class that provides methods to encode and decode strings
import java.util.Date; // Date is the class that provides methods to get the current date and time
import java.util.HashMap; // HashMap is the class that provides methods to store key-value pairs
import java.util.Map; // Map is the interface that represents a collection of key-value pairs
import java.util.function.Function;

import javax.crypto.SecretKey; // SecretKey is the interface that represents a secret key

@Component // Component is a Spring annotation that marks the class as a Spring bean
public class JwtUtil {
    private SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private String SECRET_KEY = key.toString();

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8))).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}