package com.sky.getyourway.DTOs;

public class Helper {
    private long timeBetween;
    private String arrivalDateString;

    public Helper(long timeBetween, String arrivalDateString) {
        this.timeBetween = timeBetween;
        this.arrivalDateString = arrivalDateString;
    }

    public Helper() {
    }

    public long getTimeBetween() {
        return timeBetween;
    }

    public void setTimeBetween(long timeBetween) {
        this.timeBetween = timeBetween;
    }

    public String getArrivalDateString() {
        return arrivalDateString;
    }

    public void setArrivalDateString(String arrivalDateString) {
        this.arrivalDateString = arrivalDateString;
    }
}
