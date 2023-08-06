package com.example.apiSetup.services;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import com.example.apiSetup.utilities.Request;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AviationApi {
    public String getAviationData(String source, String destination,String departure, String ret){
        FlightOfferSearch[] flightOffersSearches = new FlightOfferSearch[0];
        Amadeus amadeus = Amadeus
                .builder("ZZkbSwWOBAj4nNKZ4XRf5aynNYYjVWJZ", "8ydmsaPAGizoKCmA")
                .setLogLevel("debug") // or warn
                .build();
        try{
            flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params.with("originLocationCode", source)
                            .and("destinationLocationCode", destination)
                            .and("departureDate", departure)//YYYY-MM-DD
                            .and("returnDate", ret)
                            .and("adults", 2)
                            .and("max", 3));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        Gson gson = new Gson();
        return gson.toJson(flightOffersSearches);
    }
}
