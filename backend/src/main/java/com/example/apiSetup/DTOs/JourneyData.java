package com.example.apiSetup.DTOs;

import java.util.List;

public class JourneyData {
    private List<FlightData> flights;
    private WeatherData destinationWeather;


    public JourneyData(List<FlightData> flights, WeatherData destinationWeather) {
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
