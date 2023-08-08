package com.example.apiSetup.services;

import com.example.apiSetup.DTOs.WeatherData;
import com.example.apiSetup.utils.Request;
import com.google.gson.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class WeatherApi {
//    @Value("${weatherApiKey}")
    private String weatherApiKey = System.getenv("GYW_WEATHER_API_KEY");;

    private String getUrl(String type, String destination, String extra) {
        return String.format(
                "http://api.weatherapi.com/v1/%s.json?key=%s&q=%s%s",
                type,
                weatherApiKey,
                destination,
                extra
        );
    }

    public WeatherData getWeatherData(String destination, String arrivalDate, long timeDifference){
        String returnedData = "";

        if (timeDifference < 14){
            // 14-day forecast
            returnedData = Request.makeRequest(getUrl("forecast", destination, "&days=10&aqi=no&alerts=no"));
        } else {
            //future
            returnedData = Request.makeRequest(getUrl("future", destination, "&dt=" + arrivalDate));
        }

        return parseData(returnedData, arrivalDate);
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
                break;
            }
        }

        return result;
    }
}
