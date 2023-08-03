package com.getyourway.backend.models;

public class FlightsDataResponse {
    private FlightPairResponse morning;
    private FlightPairResponse afternoon;
    private FlightPairResponse evening;
    private FlightPairResponse night;

    public FlightPairResponse getMorning() {
        return morning;
    }

    public void setMorning(FlightPairResponse morning) {
        this.morning = morning;
    }

    public FlightPairResponse getAfternoon() {
        return afternoon;
    }

    public void setAfternoon(FlightPairResponse afternoon) {
        this.afternoon = afternoon;
    }

    public FlightPairResponse getEvening() {
        return evening;
    }

    public void setEvening(FlightPairResponse evening) {
        this.evening = evening;
    }

    public FlightPairResponse getNight() {
        return night;
    }

    public void setNight(FlightPairResponse night) {
        this.night = night;
    }
}
