package com.sky.getyourway.DTOs;

import java.util.List;
import java.util.Objects;

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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QueryResult that = (QueryResult) o;
        return Objects.equals(flights, that.flights) && Objects.equals(destinationWeather, that.destinationWeather);
    }

    @Override
    public int hashCode() {
        return Objects.hash(flights, destinationWeather);
    }
}
