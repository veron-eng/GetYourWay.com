package com.example.apiSetup.utilities;

import com.example.apiSetup.DTOs.FlightData;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class Request {
    public static String makeRequest(String uri){
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri,String.class);
        return result;
    }
}
