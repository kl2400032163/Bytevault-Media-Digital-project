package com.bytevault.order_service.controller;

import org.springframework.web.bind.annotation.*;

import com.bytevault.order_service.dto.OrderRequest;
import com.bytevault.order_service.entity.Order;
import com.bytevault.order_service.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping("/purchase")
    public Order purchase(
            @RequestBody OrderRequest request) {

        return service.purchase(request);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrders(
            @PathVariable Long userId) {

        return service.getOrdersByUser(userId);
    }

    @GetMapping("/admin")
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }
}