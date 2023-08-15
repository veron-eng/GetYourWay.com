package com.sky.getyourway.utils;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatusCode;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class requestTest {
    @Test
    public void amadeusApiCall(){
        // asserting
        int correctStatusCode = 200;

        // building the API
        FlightOfferSearch[] flightOffersSearches = new FlightOfferSearch[0];
        String apiId = System.getenv("GYW_FLIGHT_API_ID");
        String apiSecret = System.getenv("GYW_FLIGHT_API_SECRET");

        Amadeus amadeus = Amadeus
                .builder(apiId, apiSecret)
                .setLogLevel("debug") // or warn
                .build();

        // calling the API
        try {
            flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params.with("originLocationCode", "LHR")
                            .and("destinationLocationCode", "BKK")
                            .and("departureDate", "2024-01-01")//YYYY-MM-DD
                            .and("returnDate", "2024-01-02")
                            .and("adults", 2)
                            .and("max", 1));
        }catch (Exception e){
        }
        finally {
            assertEquals(flightOffersSearches[0].getResponse().getStatusCode(),correctStatusCode);// healthy API
        }
    }

    @Test
    public void amadeusApiCallIncorrect() throws ResponseException {
        // building the API
        String apiId = System.getenv("GYW_FLIGHT_API_ID");
        String apiSecret = System.getenv("GYW_FLIGHT_API_SECRET");

        Amadeus amadeus = Amadeus
                .builder(apiId, apiSecret)
                .setLogLevel("debug") // or warn
                .build();

        assertThrows(Exception.class, () -> {
            final FlightOfferSearch[] flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params.with("originLocationCode", "Mr.abdul")
                            .and("destinationLocationCode", "BKK")
                            .and("departureDate", "2024-01-01")//YYYY-MM-DD
                            .and("returnDate", "2024-01-02")
                            .and("adults", 2)
                            .and("max", 1));
        });
    }

    @Test
    public void testRequestWeather(){
        int correctStatusCode = 200;
        //build and call the api
        String weatherApiKey = System.getenv("GYW_WEATHER_API_KEY");
        String destination = "London";
        String arrivalDate = "2023-09-14";
        HttpStatusCode returnCode = Request.makeRequest((String.format("http://api.weatherapi.com/v1/%s.json?key=%s&q=%s%s","forecast",weatherApiKey, destination,"&days=10&aqi=no&alerts=no")),1).getStatusCode();
        HttpStatusCode returnCode2 = Request.makeRequest((String.format("http://api.weatherapi.com/v1/%s.json?key=%s&q=%s%s","future", weatherApiKey, destination, "&dt=" + arrivalDate)),1).getStatusCode();
        assertEquals(correctStatusCode,returnCode.value());
        assertEquals(correctStatusCode,returnCode2.value());
    }
}
