package com.sky.getyourway.configs;



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

                        .allowedOrigins("http://localhost:3000", "http://13.43.55.166:3000" , "http://13.43.55.166", "http://13.43.55.166:8080")

                        .allowedMethods("*")

                        .allowedHeaders("*") // Allow all headers or you can specify

                        .allowCredentials(true);

            }

        };

    }

}