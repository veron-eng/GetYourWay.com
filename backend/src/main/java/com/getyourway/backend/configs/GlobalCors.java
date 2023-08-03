package com.getyourway.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class GlobalCors {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Allow only this origin or use "*" to allow all
                        .allowedMethods("*") // Allow all methods or you can specify (GET, POST, etc.)
                        .allowedHeaders("*") // Allow all headers or you can specify
                        .allowCredentials(true);
            }
        };
    }
}
