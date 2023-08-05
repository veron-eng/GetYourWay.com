package com.example.apiSetup.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherApi {
    public String helloWorld(){
        return "Hello World";
    }
    public String getWeatherData(String location){
        String uri = "https://api.weatherapi.com/v1/current.json?key=9da1e4167c6e449eab474953230508&q="+location+" &aqi=no";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri,String.class);
        return result;
    }
}
