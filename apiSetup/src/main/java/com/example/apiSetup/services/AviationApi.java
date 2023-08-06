package com.example.apiSetup.services;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.resources.FlightOfferSearch;
import com.example.apiSetup.DTOs.Journey;
import com.example.apiSetup.DTOs.FlightData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AviationApi {
    public List<FlightData> getAviationData(String source, String destination, String departure, String ret){
        FlightOfferSearch[] flightOffersSearches = new FlightOfferSearch[0];
        // TODO: don't hardcode secrets
        // TODO: include adults and max as parameters from frontend
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
                            .and("max", 10));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
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

//            System.out.println(flightOffersSearch.getItineraries()[0].getSegments()[1].getArrival().getIataCode());

            flightDataList.add(flightData);
        }



        return flightDataList;
    }
}
