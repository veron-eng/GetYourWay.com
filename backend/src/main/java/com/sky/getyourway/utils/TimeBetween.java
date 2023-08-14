//package com.sky.getyourway.utils;
//
//import com.sky.getyourway.DTOs.FlightData;
//import com.sky.getyourway.DTOs.Journey;
//
//import java.time.LocalDate;
//import java.time.temporal.ChronoUnit;
//import java.util.List;
//
//public class TimeBetween {
//
//    private String arrivalDate;
//    private Long differenceBetween;
//
//    public void differenceBetween(List<FlightData> flights, String destination){
//        // Search flights for destination arrival time
//        String destArrivalTimeAndDate = "";
//        // TODO: redundant for loop - just take the last flight or change the logic
//        for (FlightData flight : flights){
//            for (Journey journey : flight.getJourneys()){
//                if (journey.getArrivalAirport().equals(destination)){
//                    destArrivalTimeAndDate = journey.getArrivalScheduledTime();
//                }
//            }
//        }
//
//        String arrivalDateString = destArrivalTimeAndDate.substring(0,10);
//
//        LocalDate currentDate = LocalDate.now();
//        setArrivalDate(arrivalDateString);
//        setDifferenceBetween(ChronoUnit.DAYS.between(currentDate,arrivalDate));
//    }
//
//    public String getArrivalDate() {
//        return arrivalDate;
//    }
//
//    public void setArrivalDate(String arrivalDateString) {
//        arrivalDate = LocalDate.parse(arrivalDateString);
//    }
//
//    public Long getDifferenceBetween() {
//        return differenceBetween;
//    }
//
//    public void setDifferenceBetween(Long differenceBetween) {
//        this.differenceBetween = differenceBetween;
//    }
//}
