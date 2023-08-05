package com.example.apiSetup.controllers;

import com.example.apiSetup.services.AviationApi;
import com.example.apiSetup.services.WeatherApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @Autowired
    WeatherApi weatherApi;
    @Autowired
    AviationApi aviationApi;
    @GetMapping("/helloWorld")
    public String helloWorld(){
        return weatherApi.helloWorld();
    }

    @GetMapping("/getWeatherData/{query}")
    public String getWeatherData(@PathVariable("query") String query){
        return weatherApi.getWeatherData(query);
    }

    @GetMapping("/getAviationData")
    public String getAviationData(){
        return aviationApi.getAviationData();
    }

    @GetMapping("/getFlights/{source}/{destination}")
    public String getFlights(
            @PathVariable("source") String source,
            @PathVariable("destination") String destination
    ){
        // TODO: return a list of flights
        return "";
    }
}
