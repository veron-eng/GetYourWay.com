package com.sky.getyourway.services;

import org.springframework.stereotype.Service;

@Service
public class RecommendationEngineService {
    public String generateURL(String source, String destination) {
        return String.format("localhost:3000?from=%s&to=%s", source, destination);
    }
}
