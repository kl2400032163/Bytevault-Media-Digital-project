package com.bytevault.user_service.usercontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bytevault.user_service.userdto.LoginRequest;
import com.bytevault.user_service.userdto.RegisterRequest;
import com.bytevault.user_service.userservice.UserService;

@RestController
@RequestMapping("/api/users")
	public class UserController {

	    private final UserService service;

	    public UserController(UserService service) {
	        this.service = service;
	    }

	    @PostMapping("/register")
	    public ResponseEntity<String> register(
	            @RequestBody RegisterRequest request) {

	        return ResponseEntity.ok(
	                service.register(request)
	        );
	    }

	    @PostMapping("/login")
	    public ResponseEntity<String> login(
	            @RequestBody LoginRequest request) {

	        return ResponseEntity.ok(
	                service.login(request)
	        );
	    }
}
