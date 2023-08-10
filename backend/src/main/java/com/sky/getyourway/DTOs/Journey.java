package com.sky.getyourway.DTOs;

public class Journey {
    private String departureAirport;
    private String departureScheduledTime;
    private String arrivalAirport;
    private String arrivalScheduledTime;

    private String duration;
    private String flightNumber;

    public Journey(String departureAirport, String departureScheduledTime, String arrivalAirport, String arrivalScheduledTime, String duration, String flightNumber) {
        this.departureAirport = departureAirport;
        this.departureScheduledTime = departureScheduledTime;
        this.arrivalAirport = arrivalAirport;
        this.arrivalScheduledTime = arrivalScheduledTime;
        this.duration = duration;
        this.flightNumber = flightNumber;
    }

    // one-way : 1 - 0 index
    // return : 2 - 0 index
    // long distance one-way : 4 - 1
    // long distance return : 8


    public String getDepartureAirport() {
        return departureAirport;
    }

    public String getDepartureScheduledTime() {
        return departureScheduledTime;
    }

    public String getArrivalAirport() {
        return arrivalAirport;
    }

    public String getArrivalScheduledTime() {
        return arrivalScheduledTime;
    }

    public String getDuration() {
        return duration;
    }

    public String getFlightNumber() {
        return flightNumber;
    }
}
