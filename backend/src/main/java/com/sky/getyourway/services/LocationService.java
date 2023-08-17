package com.sky.getyourway.services;

import com.sky.getyourway.DTOs.Location;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LocationService {

    private String googleMapsApiKey = System.getenv("GOOGLE_MAPS_API_KEY");

    public Location getLocation(String code){
        String apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?" +
                "address=" + code + "&key=" + googleMapsApiKey;

        RestTemplate restTemplate = new RestTemplate();
        GoogleMapsApiResponse response = restTemplate.getForObject(apiUrl, GoogleMapsApiResponse.class);
        System.out.println(response.getStatus());

        if (response != null && response.getStatus().equals("OK")) {
            double latitude = response.results[0].geometry.location.lat;
            double longitude = response.results[0].geometry.location.lng;
            Location locationResponse = new Location(latitude, longitude);
            return locationResponse;
        } else {
            return null;
        }
    }
    public static class GoogleMapsApiResponse {
        private String status;
        private GoogleMapsApiResult[] results;

        public String getStatus() {
            return status;
        }

        public GoogleMapsApiResult[] getResults() {
            return results;
        }
    }

    public static class GoogleMapsApiResult {
        private GoogleMapsApiGeometry geometry;

        public GoogleMapsApiGeometry getGeometry() {
            return geometry;
        }
    }

    public static class GoogleMapsApiGeometry {
        private GoogleMapsApiLocation location;

        public GoogleMapsApiLocation getLocation() {
            return location;
        }
    }

    public static class GoogleMapsApiLocation {
        private double lat;
        private double lng;

        public double getLat() {
            return lat;
        }

        public double getLng() {
            return lng;
        }
    }

}

