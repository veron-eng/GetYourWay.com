package com.example.apiSetup.services;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import com.amadeus.shopping.FlightOffersSearch;
import com.example.apiSetup.DTOs.FlightData;
import com.example.apiSetup.utilities.Request;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class AviationApi {
    public List<FlightData> getAviationData(String source, String destination,String departure, String ret){
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
                            .and("max", 1));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
//        Gson gson = new Gson();
//        return gson.toJson(flightOffersSearches);
        return populateFlightData(flightOffersSearches);
    }


    public List<FlightData> populateFlightData(FlightOfferSearch[] flightOffersSearches){

        List<FlightData> flightDataList = new ArrayList<>();
        for (FlightOfferSearch flightOffersSearch: flightOffersSearches){
            FlightData flightData = new FlightData();
            flightData.setDate("flight date");
            flightData.setFlightNumber("flight number");
            flightData.setDuration("duration");
            flightData.setPrice(flightOffersSearch.getPrice().getTotal());
            flightData.setDepartureAirport("airport");
            flightData.setArrivalScheduledTime("time");
            flightData.setArrivalAirport("arrival airport");
            flightData.setDepartureScheduledTime("depart time");

            //FlightOfferSearch a = new FlightOfferSearch();


            //FlightOfferSearch.Itinerary itinerary = flightOffersSearch.new Itinerary();

            //System.out.println(flightOffersSearch.);

            flightDataList.add(flightData);


        }



        return flightDataList;
    }
}
