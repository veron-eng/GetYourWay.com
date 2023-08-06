package com.example.apiSetup.services;

import com.example.apiSetup.DTOs.FlightData;
import com.example.apiSetup.DTOs.Journey;
import com.example.apiSetup.DTOs.JourneyData;
import com.example.apiSetup.DTOs.WeatherData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class JourneyService {
    @Autowired
    AviationApi aviationApi;

    @Autowired
    WeatherApi weatherApi;

    public JourneyData getJourney(String source, String destination, String departure, String ret) {
        List<FlightData> flights = aviationApi.getAviationData(source, destination, departure, ret);

        // Search flights for destination arrival time
        String destArrivalTimeAndDate = "";
        // TODO: redundant for loop - just take the last flight or change the logic
        for (FlightData flight : flights){
            for (Journey journey : flight.getJourneys()){
                if (journey.getArrivalAirport().equals(destination)){
                    destArrivalTimeAndDate = journey.getArrivalScheduledTime();
                }
            }
        }

        String arrivalDateString = destArrivalTimeAndDate.substring(0,10);

        LocalDate currentDate = LocalDate.now();
        LocalDate arrivalDate = LocalDate.parse(arrivalDateString);
        long differenceBetween = ChronoUnit.DAYS.between(currentDate,arrivalDate);

        WeatherData weather = weatherApi.getWeatherData(destination, arrivalDateString, differenceBetween);
        return new JourneyData(flights, weather);
    }
}
