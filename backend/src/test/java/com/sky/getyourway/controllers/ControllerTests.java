package com.sky.getyourway.controllers;
import com.sky.getyourway.utils.Request;
import org.junit.jupiter.api.Test;

public class ControllerTests {
    // 0. get a list of available locations
    // 1. choose the source and destination
    // 2. get a list of flights, weather data

    @Test
    void testGetFlights() {
        String result = Request.makeRequest("localhost:8080/getFlights/London/Paris");
        // TODO: test the return data is as expected
    }
}
