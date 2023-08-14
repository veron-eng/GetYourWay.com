package com.sky.getyourway.controllers;
//import com.sky.getyourway.DTOs.QueryResult;
//import com.sky.getyourway.DTOs.WeatherData;
//import com.sky.getyourway.services.QueryResultsService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.ArrayList;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.Mockito.when;

import com.sky.getyourway.DTOs.FlightData;
import com.sky.getyourway.DTOs.QueryResult;
import com.sky.getyourway.DTOs.WeatherData;
import com.sky.getyourway.controllers.Controller;
import com.sky.getyourway.services.QueryResultsService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.when;

@SpringBootTest
public class ControllerUnitTests {
    @Autowired
    private Controller controller;

    @MockBean
    private QueryResultsService queryResultsService;

    @Test
    void getQueryResults(){
        QueryResult res = new QueryResult(new ArrayList<>(), new WeatherData("35","30","32","2","50","www.confused.com.uk/admin"));
        when(this.queryResultsService.getJourney("LHR","BKK","2023-09-09","2023-09-12")).thenReturn(res);
        assertThat(new ResponseEntity<QueryResult>(res, HttpStatus.OK)).isEqualTo(this.controller.getFlights("LHR","BKK","2023-09-09","2023-09-12"));
    }
}
