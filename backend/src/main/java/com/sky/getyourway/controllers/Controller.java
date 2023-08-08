package com.sky.getyourway.controllers;

import com.sky.getyourway.DTOs.JourneyData;
import com.sky.getyourway.services.JourneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
