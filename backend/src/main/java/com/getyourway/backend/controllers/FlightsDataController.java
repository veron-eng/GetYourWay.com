package com.getyourway.backend.controllers;

import com.getyourway.backend.models.FlightSearchRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;

import java.time.Duration;
import java.util.*;
import com.google.gson.Gson;


@RestController
public class FlightsDataController {
    @Value("${openai.apikey}")
    private String openaiApiKey;

    @Value("${system_prompt}")
    private String systemPrompt;

    @PostMapping("/search")
    public ResponseEntity<String> FlightsData(@RequestBody FlightSearchRequest req) {
        OpenAiService service = new OpenAiService(openaiApiKey, Duration.ofSeconds(240));
        List<ChatMessage> messages = new ArrayList<>();
        ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), systemPrompt);

        ChatMessage fromAndTo = new ChatMessage(ChatMessageRole.USER.value(), "From " + req.getFrom() + " to " + req.getTo());
        messages.add(systemMessage);
        messages.add(fromAndTo);


        ChatCompletionRequest request = ChatCompletionRequest
                .builder()
                .model("gpt-3.5-turbo")
                .messages(messages)
                .temperature(0.0)
                .maxTokens(800)
                .build();

        ChatCompletionResult ApiData = service.createChatCompletion(request);
        String ApiDataString = ApiData.getChoices().get(0).getMessage().getContent();

        System.out.println(ApiDataString);

//        Gson gson = new Gson();
//
//        // Convert the JSON string to a FlightsDataResponse object.
//        FlightsDataResponse response = gson.fromJson(ApiDataString, FlightsDataResponse.class);


        return ResponseEntity.ok(ApiDataString);
    }
};