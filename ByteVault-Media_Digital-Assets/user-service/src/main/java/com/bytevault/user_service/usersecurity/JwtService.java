package com.bytevault.user_service.usersecurity;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	private final SecretKey secretKey;

    public JwtService(@Value("${jwt.secret}") String secret) {

        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)
        );
    }

        public String generateToken(Long userId, String username, String role) {

        return Jwts.builder()
                .subject(username)
                .claim("userId", userId)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                + 60 * 60 * 1000
                        )
                )
                .signWith(
                        secretKey,
                        Jwts.SIG.HS256
                )
                .compact();
    }
}
