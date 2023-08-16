package com.sky.getyourway.controllers;


import com.sky.getyourway.DTOs.*;
import com.sky.getyourway.controllers.Controller;
import com.sky.getyourway.services.LocationService;
import com.sky.getyourway.services.QueryResultsService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.lang.module.ResolutionException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
public class ControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QueryResultsService queryResultsService;

    @MockBean
    private LocationService locationService;


    @Test
    public void getJourneySuccessfulStatus() throws Exception {
        WeatherData testWeather = new WeatherData("35", "30", "32",
                "2", "50", "www.confused.com.uk/admin");

        List<FlightData> flights = new ArrayList<>();
        flights.add(new FlightData(new ArrayList<>(), "200"));
        flights.add(new FlightData(new ArrayList<>(), "300"));

//        flights.add(new FlightData("BKK", "LHR", "2023-09-12", "2023-09-15"));

        QueryResult res = new QueryResult(flights, testWeather);


        when(this.queryResultsService.getJourney("LHR", "BKK", "2023-09-09", "2023-09-12")).thenReturn(res);

        mockMvc.perform(get("/getFlights/LHR/BKK/2023-09-09/2023-09-12")).
                andDo(print()).
                andExpect(status().isOk()); //works up to this part perfectly
//                .andExpect(jsonPath("$.flight").isArray());


    }



}




