package com.mvs.scheduleservice.service;

import com.google.gson.Gson;
import com.mvs.scheduleservice.types.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class Consumer {
    @Autowired
    Producer producer;

    @KafkaListener(topics = "new-order", groupId = "schedule-group")
    public void readFromTopic(String message) throws InterruptedException{
        System.out.println("Incoming message is " + message);
        Event event = new Gson().fromJson(message, Event.class);

        if(event.getType().equals("ALLOCATION_COMPLETE")) {
            System.out.println("scheduling a date");
            producer.publishToTopic(new Event(
                    "schedule-service",
                    "SCHEDULE_COMPLETE",
                    event.getKey(),
                    event.getUniqueKey(),
                    event.getAmount(),
                    "schedule success"
                    ));
        }else {
            System.out.println("Event is not related to allocation. process ignored");
        }
    }
}
