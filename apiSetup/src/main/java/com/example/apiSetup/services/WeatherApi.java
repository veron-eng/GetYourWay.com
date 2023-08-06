package com.example.apiSetup.services;

import com.example.apiSetup.utilities.Request;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherApi {
    public String getWeatherData(String location){
        return Request.makeRequest("https://api.weatherapi.com/v1/current.json?key=9da1e4167c6e449eab474953230508&q="+location+" &aqi=no");
    }
}
