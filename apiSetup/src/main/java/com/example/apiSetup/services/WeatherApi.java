package com.example.apiSetup.services;

import com.example.apiSetup.DTOs.Journey;
import com.example.apiSetup.DTOs.FlightData;
import com.example.apiSetup.utilities.Request;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class WeatherApi {
    public String getWeatherData(String destination){
        // search flights for dest arrival timee
        String destArrivalTimeAndDate = "";
        AviationApi aviationApi = new AviationApi();
        List<FlightData> flightData = aviationApi.getAviationData("SYD",destination,"2023-11-06","2023-11-08");
        for(FlightData flights : flightData){
            for(Journey journey : flights.getJourneys()){
                if(journey.getArrivalAirport().equals("BKK")){
                    destArrivalTimeAndDate = journey.getArrivalScheduledTime();
                }
            }
        }
        String arrivalDateString = destArrivalTimeAndDate.substring(0,10);
        String arrivalTimeString = destArrivalTimeAndDate.substring(12);

        LocalDate currentDate = LocalDate.now();
        LocalDate arrivalDate = LocalDate.parse(arrivalDateString);
        long differenceBetween = ChronoUnit.DAYS.between(currentDate,arrivalDate);




        if (differenceBetween < 14){
            return Request.makeRequest("http://api.weatherapi.com/v1/forecast.json?key=812ae5e12239439693d140857233107&q=" + destination +"&days=10&aqi=no&alerts=no");
        } else {
            // use the arrival time to make the API call
            // if arrival date - current date > 14 then ...., otherwise ....
            return Request.makeRequest("http://api.weatherapi.com/v1/future.json?key=812ae5e12239439693d140857233107&q=" + destination + "&dt=" + arrivalDate);

        }
    }
}
