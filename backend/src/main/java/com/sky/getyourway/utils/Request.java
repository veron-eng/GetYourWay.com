package com.sky.getyourway.utils;
import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class Request {
    public static String makeRequest(String uri){
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri,String.class);
        return result;
    }


    public static ResponseEntity makeRequestTest(String url){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }

    public static FlightOfferSearch[] amadeusApiCall(String source, String destination, String departure, String ret, Amadeus amadeus) throws ResponseException {
        FlightOfferSearch[] flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                Params.with("originLocationCode", source)
                        .and("destinationLocationCode", destination)
                        .and("departureDate", departure)//YYYY-MM-DD
                        .and("returnDate", ret)
                        .and("adults", 2)
                        .and("max", 10));
        return flightOffersSearches;
    }
}
