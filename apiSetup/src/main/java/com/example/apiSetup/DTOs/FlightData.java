package com.example.apiSetup.DTOs;

import java.util.ArrayList;
import java.util.List;

public class FlightData {

    List<Flight> flights = new ArrayList<>();
//    private String flightNumber;  //  concat flight carrier code and number
//    private String duration; // need to do string operations
    private String price;

    public FlightData() {
    }

    public List<Flight> getFlights() {
        return flights;
    }

    public void setFlights(List<Flight> flights) {
        this.flights = flights;
    }


    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
