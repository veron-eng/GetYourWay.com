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
            flightData.setFlightNumber(flightOffersSearch.getItineraries()[0].getSegments()[0].getCarrierCode()+flightOffersSearch.getItineraries()[0].getSegments()[0].getNumber());
            flightData.setDepartureScheduledTime(flightOffersSearch.getItineraries()[0].getSegments()[0].getDeparture().getAt());
            flightData.setDepartureAirport(flightOffersSearch.getItineraries()[0].getSegments()[0].getDeparture().getIataCode());
            flightData.setArrivalScheduledTime(flightOffersSearch.getItineraries()[0].getSegments()[0].getArrival().getAt());
            flightData.setArrivalAirport(flightOffersSearch.getItineraries()[0].getSegments()[0].getArrival().getIataCode());
            flightData.setDuration(flightOffersSearch.getItineraries()[0].getSegments()[0].getDuration().substring(2));
            flightData.setPrice(flightOffersSearch.getPrice().getTotal());

            //FlightOfferSearch a = new FlightOfferSearch();


            //FlightOfferSearch.Itinerary itinerary = flightOffersSearch.new Itinerary();

//            System.out.println(flightOffersSearch.getItineraries()[0].getSegments()[0].getCarrierCode()+flightOffersSearch.getItineraries()[0].getSegments()[0].getNumber());

            flightDataList.add(flightData);
        }



        return flightDataList;
    }
}
