package com.example.apiSetup.services;

import com.example.apiSetup.DTOs.Journey;
import com.example.apiSetup.DTOs.FlightData;
import com.example.apiSetup.utilities.Request;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Service;
import top.jfunc.json.impl.JSONObject;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class WeatherApi {
    public String getWeatherData(String destination){
        // search flights for dest arrival timee
        String destArrivalTimeAndDate = "";
        AviationApi aviationApi = new AviationApi();
        List<FlightData> flightData = aviationApi.getAviationData("SYD",destination,"2024-04-20","2024-04-25");
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

        String returnedData = "";

        if (differenceBetween < 14){// 14-day forecast
            returnedData = Request.makeRequest("http://api.weatherapi.com/v1/forecast.json?key=812ae5e12239439693d140857233107&q=" + destination +"&days=10&aqi=no&alerts=no");
        } else {//future
            returnedData = Request.makeRequest("http://api.weatherapi.com/v1/future.json?key=812ae5e12239439693d140857233107&q=" + destination + "&dt=" + arrivalDate);
            // populate weather DTO
            JSONObject obj = new JSONObject(returnedData);
            System.out.println(obj.getJsonObject("forecast").get("forecastday"));
        }
        return returnedData;
    }
}
