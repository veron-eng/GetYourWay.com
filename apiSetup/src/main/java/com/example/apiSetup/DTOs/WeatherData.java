package com.example.apiSetup.DTOs;

public class WeatherData {
    private String maxTemperature;
    private String minTemperature;
    private String avgTemperature;
    private String maxWind;
    private String avgHumidity;
    private String icon;

    public String getMaxTemperature() {
        return maxTemperature;
    }

    public String getMinTemperature() {
        return minTemperature;
    }

    public String getAvgTemperature() {
        return avgTemperature;
    }

    public String getMaxWind() {
        return maxWind;
    }

    public String getAvgHumidity() {
        return avgHumidity;
    }

    public String getIcon() {
        return icon;
    }

    public WeatherData(String maxTemperature,
                       String minTemperature,
                       String avgTemperature,
                       String maxWind,
                       String avgHumidity,
                       String icon) {
        this.maxTemperature = maxTemperature;
        this.minTemperature = minTemperature;
        this.avgTemperature = avgTemperature;
        this.maxWind = maxWind;
        this.avgHumidity = avgHumidity;
        this.icon = icon;
    }
}
