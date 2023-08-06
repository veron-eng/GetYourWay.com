package com.example.apiSetup.services;

import com.example.apiSetup.DTOs.Journey;
import com.example.apiSetup.DTOs.FlightData;
import com.example.apiSetup.DTOs.WeatherData;
import com.example.apiSetup.utilities.Request;
import com.google.gson.*;
import org.springframework.stereotype.Service;
import top.jfunc.json.impl.JSONObject;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherApi {
    public String getWeatherData(String destination){
        // search flights for dest arrival timee
        String destArrivalTimeAndDate = "";
        AviationApi aviationApi = new AviationApi();
        List<FlightData> flightData = aviationApi.getAviationData("SYD",destination,"2023-08-17","2023-08-21");
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
        } else {
            //future
            returnedData = Request.makeRequest("http://api.weatherapi.com/v1/future.json?key=812ae5e12239439693d140857233107&q=" + destination + "&dt=" + arrivalDate);
            System.out.println(returnedData);
            // populate weather DTO
            JSONObject obj = new JSONObject(returnedData);
//            System.out.println(obj.getJsonObject("forecast").get("forecastday"));
        }
        return returnedData;
    }

    public WeatherData parseData(String data, String date) {
        LocalDate arrivalDate = LocalDate.parse(date);
        // Starting from the root, get the list of forecast days
        JsonElement root = JsonParser.parseString(data);
        JsonArray days = root.getAsJsonObject()
                .get("forecast")
                .getAsJsonObject()
                .get("forecastday")
                .getAsJsonArray();

        WeatherData result = null;

        for (int i=0; i < days.size(); i++) {
            JsonElement day = days.get(i);

            // Check to see if the date is found, or if it is out of range
            LocalDate dayDate = LocalDate.parse(day.getAsJsonObject().get("date").getAsString());
            int dateComparison = dayDate.compareTo(arrivalDate);

            if (dateComparison == 0
                    || (i == 0 && dateComparison < 0)
                    || (i == days.size() - 1 && dateComparison > 0)
            ) {
                // Extract the data for the chosen day
                JsonObject obj = day.getAsJsonObject()
                        .get("day")
                        .getAsJsonObject();

                // Pack the data into our WeatherData object
                result = new WeatherData(
                        obj.get("maxtemp_c").getAsString(),
                        obj.get("mintemp_c").getAsString(),
                        obj.get("avgtemp_c").getAsString(),
                        obj.get("maxwind_mph").getAsString(),
                        obj.get("avghumidity").getAsString(),
                        obj.get("condition").getAsJsonObject().get("icon").getAsString()
                );
            }
        }

        return result;
    }
}
