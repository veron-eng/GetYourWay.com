package com.sky.getyourway.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class LocationServiceTest {

  @Autowired
    LocationService locationService;

  String googleMapsApiKey = "AIzaSyBQ-7FRus3W2IvCX1Fr3Eis77q0CdL-pOs";//System.getenv("GOOGLE_MAPS_API_KEY");

  @Test
    public void getLocationTestSuccessful(){
    String apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?" +
            "address=LHR&key=" + googleMapsApiKey;
    RestTemplate restTemplate = new RestTemplate();
    LocationService.GoogleMapsApiResponse response = restTemplate.getForObject(apiUrl, LocationService.GoogleMapsApiResponse.class);
    assertEquals(response.getStatus(),"OK");
  }

  @Test
  public void getLocationTestWrongKey(){
    String apiUrl = "https://maps.googleapis.com/maps/ap/geocode/json?" +
            "address=LHR&key=jsidjsaiod";
    RestTemplate restTemplate = new RestTemplate();
    assertThrows(Exception.class, () -> {
      LocationService.GoogleMapsApiResponse response = restTemplate.getForObject(apiUrl, LocationService.GoogleMapsApiResponse.class);
    });
  }
}
