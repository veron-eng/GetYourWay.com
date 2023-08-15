package com.sky.getyourway.services;

import com.sky.getyourway.DTOs.WeatherData;
import com.sky.getyourway.services.WeatherApi;
import com.sky.getyourway.utils.Request;
import com.sky.getyourway.utils.TestData;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class WeatherApiTests {
    @Test
    void getFutureWeatherData() {
        WeatherApi api = new WeatherApi();
        String data = TestData.getFutureWeatherData();
        WeatherData day = api.parseData(data, "2024-04-21");

        assertEquals("34.8", day.getMaxTemperature());
        assertEquals("28.8", day.getMinTemperature());
        assertEquals("31.3", day.getAvgTemperature());
        assertEquals("13.4", day.getMaxWind());
        assertEquals("62.0", day.getAvgHumidity());
        assertEquals("//cdn.weatherapi.com/weather/64x64/day/305.png", day.getIcon());
    }

//    @Test
//    void getForecastWeatherData() {
//        WeatherApi api = new WeatherApi();
//        String data = TestData.getForecastWeatherData();
//        WeatherData day = api.parseData(data, "2023-08-17");
//
//        Assertions.assertEquals("32.7", day.getMaxTemperature());
//        Assertions.assertEquals("28.1", day.getMinTemperature());
//        Assertions.assertEquals("30.4", day.getAvgTemperature());
//        Assertions.assertEquals("15.7", day.getMaxWind());
//        Assertions.assertEquals("63.0", day.getAvgHumidity());
//        Assertions.assertEquals("//cdn.weatherapi.com/weather/64x64/day/176.png", day.getIcon());
//    }


    @Test
    public void testGetWeather(){
        int correctStatusCode = 200;
        //build and call the api
        String weatherApiKey = System.getenv("GYW_WEATHER_API_KEY");
        String destination = "London";
        HttpStatusCode returnCode = Request.makeRequest2((String.format("http://api.weatherapi.com/v1/%s.json?key=%s&q=%s%s","forecast",weatherApiKey, destination,"&days=10&aqi=no&alerts=no"))).getStatusCode();
        assertEquals(correctStatusCode,returnCode.value());
    }
}
