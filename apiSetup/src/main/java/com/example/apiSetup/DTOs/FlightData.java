package com.example.apiSetup.DTOs;

import java.util.ArrayList;
import java.util.List;

public class FlightData {
    private String departureAirport;
    private String departureScheduledTime;
    private String arrivalAirport;
    private String arrivalScheduledTime;
//    List<Flight> flights = new ArrayList<>();
    private String flightNumber;  //  concat flight carrier code and number
    private String duration; // need to do string operations
    private String price;

    public FlightData() {
    }

    public String getDepartureAirport() {
        return departureAirport;
    }

    public void setDepartureAirport(String departureAirport) {
        this.departureAirport = departureAirport;
    }

    public String getDepartureScheduledTime() {
        return departureScheduledTime;
    }

    public void setDepartureScheduledTime(String departureScheduledTime) {
        this.departureScheduledTime = departureScheduledTime;
    }

    public String getArrivalAirport() {
        return arrivalAirport;
    }

    public void setArrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public String getArrivalScheduledTime() {
        return arrivalScheduledTime;
    }

    public void setArrivalScheduledTime(String arrivalScheduledTime) {
        this.arrivalScheduledTime = arrivalScheduledTime;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
