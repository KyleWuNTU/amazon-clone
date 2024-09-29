package com.example.demo.entity;
import jakarta.persistence.*;

@Embeddable
@Table(name = "basket_items")
public class BasketItem {
    private String id;
    private String title;
    private String image;
    private Double price;
    private int rating;

    // Constructor
    public BasketItem(String id, String title, String image, Double price, int rating) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.rating = rating;
    }

    // Default constructor
    public BasketItem() {}

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "BasketItem{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", image='" + image + '\'' +
                ", price=" + price +
                ", rating=" + rating +
                '}';
    }
}
