package com.sky.getyourway.services;

import com.amadeus.Amadeus;
import com.amadeus.resources.FlightOfferSearch;
import com.sky.getyourway.DTOs.Journey;
import com.sky.getyourway.DTOs.FlightData;
import com.sky.getyourway.utils.Request;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class AviationApi {

    public List<FlightData> handleAviationApi(String source, String destination, String departure, String ret) {
        FlightOfferSearch[] flightOffersSearches = new FlightOfferSearch[0];

        String apiId = System.getenv("GYW_FLIGHT_API_ID");
        String apiSecret = System.getenv("GYW_FLIGHT_API_SECRET");

        Amadeus amadeus = Amadeus
                .builder(apiId, apiSecret)
                .setLogLevel("debug") // or warn
                .build();
        try{
            flightOffersSearches = Request.amadeusApiCall(source, destination, departure, ret, amadeus);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            // fallback api or error msg
        }

        return populateFlightData(flightOffersSearches);
    }


    public List<FlightData> populateFlightData(FlightOfferSearch[] flightOffersSearches){

        List<FlightData> flightDataList = new ArrayList<>();
        for (FlightOfferSearch flightOffersSearch: flightOffersSearches){
            FlightData flightData = new FlightData();

            List<Journey> journeys = new ArrayList<>();

            for (FlightOfferSearch.Itinerary itinerary : flightOffersSearch.getItineraries()) {

                for (FlightOfferSearch.SearchSegment segment : itinerary.getSegments()) {

                    Journey journey = new Journey(segment.getDeparture().getIataCode(), segment.getDeparture().getAt(), segment.getArrival().getIataCode(), segment.getArrival().getAt(), segment.getDuration(), segment.getCarrierCode() + segment.getNumber());
                    journeys.add(journey);
                }

            }
            flightData.setJourneys(journeys);

            flightData.setPrice(flightOffersSearch.getPrice().getTotal());

            flightDataList.add(flightData);
        }
        return flightDataList;
    }
}
