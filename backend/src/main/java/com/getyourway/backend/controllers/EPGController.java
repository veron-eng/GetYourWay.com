package com.getyourway.backend.controllers;

import com.getyourway.backend.models.FlightSearchRequest;
import com.getyourway.backend.models.FlightsDataResponse;
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


@RestController
public class EPGController {
    @Value("${openai.apikey}")
    private String openaiApiKey;

    @Value("${system_prompt}")
    private String systemPrompt;

    @PostMapping("/EPG")
    public ResponseEntity<String> EPGRec(@RequestBody FlightSearchRequest req) {
        OpenAiService service = new OpenAiService(openaiApiKey, Duration.ofSeconds(240));
        List<ChatMessage> messages = new ArrayList<>();
        ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), "Recommend two movies and/or TV shows based on the location I give you. With each recommendation, provide a very short and brief description. In your description, subtly mention the relevance to the location. Return the recommendations in JSON format with two fields, title and description. The recommendations should be returned as an array of objects. Here is an example of the format I want you to follow strictly:" +
                "[{\n" +
                "  \"title\": \"Scott Pilgrim vs. the World\",\n" +
                "  \"description\": \"Scott Pilgrim, a Toronto-based slacker and musician, must defeat his new girlfriend's seven evil exes in epic battles to win her heart. The film showcases various iconic locations in Toronto, such as Casa Loma and the CN Tower.\"\n" +
                "}]");

        ChatMessage fromAndTo = new ChatMessage(ChatMessageRole.USER.value(), req.getTo());
        messages.add(systemMessage);
        messages.add(fromAndTo);


        ChatCompletionRequest request = ChatCompletionRequest
                .builder()
                .model("gpt-3.5-turbo")
                .messages(messages)
                .temperature(1.0)
                .build();

        ChatCompletionResult ApiData = service.createChatCompletion(request);
        String ApiDataString = ApiData.getChoices().get(0).getMessage().getContent();

        System.out.println(ApiDataString);

        return ResponseEntity.ok(ApiDataString);
    }
};