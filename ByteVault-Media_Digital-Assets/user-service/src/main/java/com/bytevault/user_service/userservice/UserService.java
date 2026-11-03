package com.bytevault.user_service.userservice;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bytevault.user_service.entity.User;
import com.bytevault.user_service.repository.UserRepository;
import com.bytevault.user_service.userdto.LoginRequest;
import com.bytevault.user_service.userdto.RegisterRequest;
import com.bytevault.user_service.usersecurity.JwtService;

@Service
public class UserService {
	private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(
            UserRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequest request) {

        if (repository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (repository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setRole("USER");

        repository.save(user);

        return "User registered successfully";
    }

    public String login(LoginRequest request) {

        User user = repository.findByUsername(
                request.getUsername()
        ).orElseThrow(
                () -> new RuntimeException("Invalid username or password")
        );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        return jwtService.generateToken(
            user.getUserId(),
                user.getUsername(),
                user.getRole()
        );
    }
}
