package api_gateway.config;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfig {

    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public ReactiveJwtDecoder jwtDecoder() {

        SecretKey key = new SecretKeySpec(
                secret.getBytes(StandardCharsets.UTF_8),
                "HmacSHA256"
        );

        return NimbusReactiveJwtDecoder
                .withSecretKey(key)
                .build();
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(
            ServerHttpSecurity http) {

        return http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> {})

                .authorizeExchange(exchange -> exchange

                    .pathMatchers(HttpMethod.OPTIONS, "/**")
                    .permitAll()

                    .pathMatchers(
                            "/api/users/register",
                            "/api/users/login",
                            "/actuator/**"
                    )
                    .permitAll()

                    .pathMatchers("/api/products")
                    .permitAll()

                    .pathMatchers("/api/products/**")
                    .authenticated()

                    .pathMatchers("/api/orders/**")
                    .authenticated()

                    .anyExchange()
                    .authenticated()
                )

                .oauth2ResourceServer(
                        oauth -> oauth.jwt(jwt -> {})
                )

                .build();
    }
}