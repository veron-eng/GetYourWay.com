package com.sky.getyourway.controllers;

import com.sky.getyourway.DTOs.QueryResult;
import com.sky.getyourway.DTOs.Location;
import com.sky.getyourway.services.QueryResultsService;
import com.sky.getyourway.services.LocationService;
import com.sky.getyourway.services.RecommendationEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @Autowired
    QueryResultsService queryResultsService;

    @Autowired
    LocationService locationService;

    @Autowired
    RecommendationEngineService reService;

//    @GetMapping("/getFlights/{source}/{destination}/{departure}/{ret}")
//    public QueryResult getFlights(
//            @PathVariable("source") String source,
//            @PathVariable("destination") String destination,
//            @PathVariable("departure") String departure,
//            @PathVariable("ret") String ret
//    ){
//        return queryResultsService.getJourney(source, destination, departure, ret);//dataToFrondEnd
//    }

    @GetMapping("/getFlights/{source}/{destination}/{departure}/{ret}/{passengers}")
    public ResponseEntity<QueryResult> getFlights(
            @PathVariable("source") String source,
            @PathVariable("destination") String destination,
            @PathVariable("departure") String departure,
            @PathVariable("ret") String ret,
            @PathVariable("passengers") String passengers
    ){
        QueryResult queryResult = queryResultsService.getJourney(source, destination, departure, ret, passengers);//dataToFrondEnd
        return ResponseEntity.ok(queryResult);
    }

//    @GetMapping("/getLocation/{code}")
//    public Location getLocation(@PathVariable("code") String code){
//        System.out.println(locationService.getLocation(code));
//        return locationService.getLocation(code);
//    }

    @GetMapping("/getLocation/{code}")
    public ResponseEntity<Location> getLocation(@PathVariable("code") String code){
        System.out.println(locationService.getLocation(code));
        Location location = locationService.getLocation(code);
        return ResponseEntity.ok(location);
    }

    @GetMapping("/getURL/{source}/{destination}")
    public ResponseEntity<String> getURL(@PathVariable("source") String source, @PathVariable("destination") String destination) {
        String url = reService.generateURL(source, destination);
        return ResponseEntity.ok(url);
    }
}
