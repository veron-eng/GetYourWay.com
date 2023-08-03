package com.getyourway.backend.models;

public class FlightPairResponse {
    private FlightInfoResponse outboundFlight;
    private FlightInfoResponse returnFlight;
    private String price;

    public FlightInfoResponse getOutbound() {
        return outboundFlight;
    }

    public void setOutbound(FlightInfoResponse outboundFlight) {
        this.outboundFlight = outboundFlight;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }


    public FlightInfoResponse getReturnFlight() {
        return returnFlight;
    }

    public void setReturnFlight(FlightInfoResponse returnFlight) {
        this.returnFlight = returnFlight;
    }

}
