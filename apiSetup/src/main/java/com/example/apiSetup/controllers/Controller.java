package com.example.apiSetup.controllers;

import com.amadeus.resources.FlightOfferSearch;
import com.example.apiSetup.DTOs.FlightData;
import com.example.apiSetup.services.AviationApi;
import com.example.apiSetup.services.WeatherApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Controller {
    @Autowired
    WeatherApi weatherApi;
    @Autowired
    AviationApi aviationApi;

    @GetMapping("/getWeatherData/{destination}")
    public String getWeatherData(@PathVariable("destination") String destination){
        return weatherApi.getWeatherData(destination);
    }

    @GetMapping("/getAviationData/{source}/{destination}/{departure}/{ret}")
    public List<FlightData> getAviationData(@PathVariable("source") String source, @PathVariable("destination") String destination, @PathVariable("departure") String departure, @PathVariable("ret") String ret){
        return aviationApi.getAviationData(source,destination,departure,ret);
    }

//    @GetMapping("/getFlights/{source}/{destination}")
//    public String getFlights(
//            @PathVariable("source") String source,
//            @PathVariable("destination") String destination
//    ){
//        // TODO: return journey data
//        return "";
//    }
}
