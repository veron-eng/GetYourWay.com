package com.sky.getyourway.services;

import com.amadeus.Amadeus;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import com.sky.getyourway.DTOs.FlightData;
import com.sky.getyourway.DTOs.Journey;
import com.sky.getyourway.utils.Request;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.FactoryBasedNavigableListAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class AviationApiTests {
    @Autowired
    AviationApi aviApi;

    @Test
    public void populateFlightDataTest() throws ResponseException {
        // make api call and get the data as a parameters
        FlightOfferSearch[] flightOffersSearches;
        String apiId = "uA9SdKENutAxwbX9psZOJotjPtbxYm2I";//System.getenv("GYW_FLIGHT_API_ID");
        String apiSecret = "Xo9GMBOAkytZcLJz";//System.getenv("GYW_FLIGHT_API_SECRET");

        Amadeus amadeus = Amadeus
                .builder(apiId, apiSecret)
                .setLogLevel("debug") // or warn
                .build();
        flightOffersSearches = Request.amadeusApiCall("LHR", "CDG", "2024-01-01", "2024-01-02","1", amadeus);

        // test value
        List<FlightData> fd = new ArrayList<>();
        Journey j1 = new Journey("LHR","2024-01-01T11:30:00","CDG","2024-01-01T13:50:00","PT1H20M","AF1581");
        Journey j2 = new Journey("CDG","2024-01-02T07:35:00","LHR","2024-01-02T08:00:00","PT1H25M","AF1680");

        ArrayList journeys = new ArrayList<>();
        journeys.add(j1);
        journeys.add(j2);

        fd.add(new FlightData(journeys,"498.68"));
        FlightData testValue = fd.get(0);

        // assert
        FlightData returnedResult = aviApi.populateFlightData(flightOffersSearches).get(0);
        System.out.println(fd.get(0).getJourneys().get(0));
//        System.out.println(testValue);
//        assertThat(returnedResult).isEqualToComparingFieldByField(testValue);
//        assertEquals(returnedResult,testValue);
    }
}
