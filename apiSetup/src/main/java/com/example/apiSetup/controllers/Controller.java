package com.example.apiSetup.controllers;

import com.amadeus.resources.FlightOfferSearch;
import com.example.apiSetup.DTOs.FlightData;
import com.example.apiSetup.DTOs.JourneyData;
import com.example.apiSetup.DTOs.WeatherData;
import com.example.apiSetup.services.AviationApi;
import com.example.apiSetup.services.JourneyService;
import com.example.apiSetup.services.WeatherApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Controller {
    @Autowired
    JourneyService journeyService;

    @GetMapping("/getFlights/{source}/{destination}/{departure}/{ret}")
    public JourneyData getFlights(
            @PathVariable("source") String source,
            @PathVariable("destination") String destination,
            @PathVariable("departure") String departure,
            @PathVariable("ret") String ret
    ){
        return journeyService.getJourney(source, destination, departure, ret);
    }
}
