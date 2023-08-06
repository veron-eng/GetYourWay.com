package com.example.apiSetup.DTOs;

public class Flight {
    private String departureAirport;
    private String departureScheduledTime;
    private String arrivalAirport;
    private String arrivalScheduledTime;

    public Flight(String departureAirport, String departureScheduledTime, String arrivalAirport, String arrivalScheduledTime) {
        this.departureAirport = departureAirport;
        this.departureScheduledTime = departureScheduledTime;
        this.arrivalAirport = arrivalAirport;
        this.arrivalScheduledTime = arrivalScheduledTime;
    }

    // one-way : 1
    // return : 2
    // long distance one-way : 4
    // long distance return : 8

}
