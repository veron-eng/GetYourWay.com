package com.sky.getyourway.DTOs;

import java.util.ArrayList;
import java.util.List;

public class FlightData {

    List<Journey> journeys = new ArrayList<>();
//    private String flightNumber;  //  concat flight carrier code and number
//    private String duration; // need to do string operations


    public FlightData(List<Journey> journeys, String price) {
        this.journeys = journeys;
        this.price = price;
    }

    public FlightData() {
    }

    private String price;

    public List<Journey> getJourneys() {
        return journeys;
    }

    public void setJourneys(List<Journey> journeys) {
        this.journeys = journeys;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
