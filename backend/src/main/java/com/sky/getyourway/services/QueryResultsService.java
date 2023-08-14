package com.sky.getyourway.services;

import com.sky.getyourway.DTOs.*;
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

        TimeBetween timeBetween = new TimeBetween();
        Helper helper = timeBetween.getHelp(flights,destination);

        WeatherData weather = weatherApi.getWeatherData(destination, helper.getArrivalDateString(), helper.getTimeBetween());
        return new QueryResult(flights, weather);
    }
}
