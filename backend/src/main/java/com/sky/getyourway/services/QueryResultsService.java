package com.sky.getyourway.services;

import com.sky.getyourway.DTOs.FlightData;
import com.sky.getyourway.DTOs.Journey;
import com.sky.getyourway.DTOs.QueryResult;
import com.sky.getyourway.DTOs.WeatherData;
import com.sky.getyourway.utils.TimeBetween;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class QueryResultsService {
    @Autowired
    AviationApi aviationApi;

    @Autowired
    WeatherApi weatherApi;

    public QueryResult getJourney(String source, String destination, String departure, String ret) {
        List<FlightData> flights = aviationApi.handleAviationApi(source, destination, departure, ret);

//        // Search flights for destination arrival time
//        String destArrivalTimeAndDate = "";
//        // TODO: redundant for loop - just take the last flight or change the logic
//        for (FlightData flight : flights){
//            for (Journey journey : flight.getJourneys()){
//                if (journey.getArrivalAirport().equals(destination)){
//                    destArrivalTimeAndDate = journey.getArrivalScheduledTime();
//                }
//            }
//        }
//
//        String arrivalDateString = destArrivalTimeAndDate.substring(0,10);
//
//        LocalDate currentDate = LocalDate.now();
//        LocalDate arrivalDate = LocalDate.parse(arrivalDateString);
//        long differenceBetween = ChronoUnit.DAYS.between(currentDate,arrivalDate);
          TimeBetween timeBetween = new TimeBetween();

          timeBetween.differenceBetween(flights,destination);



        String arrivalDateString = LocalDate.parse(timeBetween.getArrivalDate();

        Long differenceBetween = TimeBetween.differenceBetween(flights,destination);

        WeatherData weather = weatherApi.getWeatherData(destination, arrivalDateString, differenceBetween);
        return new QueryResult(flights, weather);
    }
}