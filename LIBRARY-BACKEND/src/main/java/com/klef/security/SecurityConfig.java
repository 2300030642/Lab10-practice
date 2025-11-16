package com.klef.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()  // ✅ Enable CORS using CorsConfig bean
            .and()
            .csrf(csrf -> csrf.disable()) // Disable CSRF for development
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/springbootlibraryapi/**").permitAll()
                .anyRequest().authenticated());

        return http.build();
    }
}
