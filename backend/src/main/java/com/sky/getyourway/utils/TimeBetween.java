
package com.sky.getyourway.utils;

import com.sky.getyourway.DTOs.FlightData;
import com.sky.getyourway.DTOs.Helper;
import com.sky.getyourway.DTOs.Journey;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class TimeBetween {

    private String arrivalDate;
    private Long differenceBetween;

    public Helper getHelp(List<FlightData> flights, String destination){
        // Search flights for destination arrival time
        String destArrivalTimeAndDate = "";
        // TODO: redundant for loop - just take the last flight or change the logic
        for (FlightData flight : flights){
            for (Journey journey : flight.getJourneys()){
                if (journey.getArrivalAirport().equals(destination)){
                    destArrivalTimeAndDate = journey.getArrivalScheduledTime();
                }
            }
        }
        Helper helper = new Helper();
        String arrivalDateString = destArrivalTimeAndDate.substring(0,10);
        helper.setArrivalDateString(arrivalDateString);

        LocalDate currentDate = LocalDate.now();
        long timeBetween = ChronoUnit.DAYS.between(currentDate,LocalDate.parse(arrivalDateString));
        helper.setTimeBetween(timeBetween);
        return helper;
    }
}
