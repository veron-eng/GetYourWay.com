package com.example.apiSetup.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AviationApi {
    public String getAviationData(){
        String uri = "http://api.aviationstack.com/v1/flights?access_key=2ba1e53c953764139a8f49f898ac0116";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri,String.class);
        return result;
    }
}
