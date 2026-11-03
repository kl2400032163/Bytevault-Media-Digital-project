package com.bytevault.order_service.service;

import org.springframework.stereotype.Service;

import com.bytevault.order_service.client.ProductClient;
import com.bytevault.order_service.dto.OrderRequest;
import com.bytevault.order_service.dto.ProductDto;
import com.bytevault.order_service.entity.Order;
import com.bytevault.order_service.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductClient productClient;

    public OrderService(
            OrderRepository orderRepository,
            ProductClient productClient) {

        this.orderRepository = orderRepository;
        this.productClient = productClient;
    }

    public Order purchase(OrderRequest request) {

        ProductDto product =
                productClient.getProduct(
                        request.getProductId()
                );

        if (product == null) {
            throw new RuntimeException(
                    "Product not found"
            );
        }

        Order order = new Order();

        order.setUserId(request.getUserId());
        order.setProductId(request.getProductId());
        order.setPurchaseStatus("SUCCESS");
        order.setCreatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(Long userId) {

        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}