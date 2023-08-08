package com.sky.getyourway.utils;

import org.springframework.web.client.RestTemplate;

public class Request {
    public static String makeRequest(String uri){
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri,String.class);
        return result;
    }
}
