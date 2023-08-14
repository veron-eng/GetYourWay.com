package com.sky.getyourway.DTOs;

import java.util.List;

public class QueryResult {
    private List<FlightData> flights;
    private WeatherData destinationWeather;


    public QueryResult(List<FlightData> flights, WeatherData destinationWeather) {
        this.flights = flights;
        this.destinationWeather = destinationWeather;
    }

    public List<FlightData> getFlights() {
        return flights;
    }

    public WeatherData getDestinationWeather() {
        return destinationWeather;
    }
}
