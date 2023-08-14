package com.sky.getyourway.controllers;

import com.sky.getyourway.DTOs.QueryResult;
import com.sky.getyourway.DTOs.Location;
import com.sky.getyourway.services.QueryResultsService;
import com.sky.getyourway.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @Autowired
    QueryResultsService queryResultsService;

    @Autowired
    LocationService locationService;

    @GetMapping("/getFlights/{source}/{destination}/{departure}/{ret}")
    public QueryResult getFlights(
            @PathVariable("source") String source,
            @PathVariable("destination") String destination,
            @PathVariable("departure") String departure,
            @PathVariable("ret") String ret
    ){
        return queryResultsService.getJourney(source, destination, departure, ret);//dataToFrondEnd
    }

    @GetMapping("/getLocation/{code}")
    public Location getLocation(@PathVariable("code") String code){
        System.out.println(locationService.getLocation(code));
        return locationService.getLocation(code);
    }
}
