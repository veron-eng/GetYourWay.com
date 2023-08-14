package com.sky.getyourway.services;

import com.sky.getyourway.DTOs.FlightData;
import com.sky.getyourway.DTOs.Journey;
import com.sky.getyourway.DTOs.QueryResult;
import com.sky.getyourway.DTOs.WeatherData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class QueryServiceUnitTests {

    @Autowired
    QueryResultsService queryResultsService;

    @MockBean
    AviationApi aviationApi;

    @MockBean
    WeatherApi weatherApi;


    @Test
    public void getJourneyTest(){
        Journey journey = new Journey("LHR","2024-01-01T21:55:00","BKK","2024-01-02T07:45:00","PT6H50M","EY26");
        ArrayList journeys = new ArrayList<>();
        journeys.add(journey);
        FlightData flightData = new FlightData(journeys,"");
        ArrayList fd = new ArrayList<>();
        fd.add(flightData);

        String arrivalDateString = "2024-01-02";

        LocalDate currentDate = LocalDate.now();
        LocalDate arrivalDate = LocalDate.parse(arrivalDateString);
        long differenceBetween = ChronoUnit.DAYS.between(currentDate,arrivalDate);

        QueryResult res = new QueryResult(fd,new WeatherData("35","30","32","2","50","www.confused.com.uk/admin"));
        when(aviationApi.handleAviationApi("LHR","BKK","2024-01-01","2024-01-02")).thenReturn(fd);
        when(weatherApi.getWeatherData("BKK","2024-01-02",differenceBetween)).thenReturn(new WeatherData("35","30","32","2","50","www.confused.com.uk/admin"));
        assertEquals(res,queryResultsService.getJourney("LHR","BKK","2024-01-01","2024-01-02"));
//

    }




}
