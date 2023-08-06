package com.example.apiSetup.services;

import com.example.apiSetup.DTOs.Journey;
import com.example.apiSetup.DTOs.FlightData;
import com.example.apiSetup.utilities.Request;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeatherApi {
    public String getWeatherData(String destination){
        // search flights for dest arrival time
        String destArrivalTime = "";
        AviationApi aviationApi = new AviationApi();
        List<FlightData> flightData = aviationApi.getAviationData("SYD",destination,"2023-11-06","2023-11-08");
        for(FlightData flights : flightData){
            for(Journey journey : flights.getJourneys()){
                if(journey.getArrivalAirport().equals("BKK")){
                    destArrivalTime = journey.getArrivalScheduledTime();
                }
            }
        }

        // use the arrival time to make the API call
        // if arrival date - current date > 14 then ...., otherwise ....
        return Request.makeRequest("https://api.weatherapi.com/v1/current.json?key=9da1e4167c6e449eab474953230508&q="+destination+" &aqi=no");
    }
}
