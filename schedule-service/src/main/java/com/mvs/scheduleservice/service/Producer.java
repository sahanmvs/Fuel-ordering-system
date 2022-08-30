package com.mvs.scheduleservice.service;

import com.mvs.scheduleservice.types.Event;
import com.mvs.scheduleservice.types.EventProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class Producer {
    public static final String topic = "new-order-response";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void publishToTopic(EventProducer event) {
        System.out.println("publishing to " + topic);
        this.kafkaTemplate.send(topic, event.toString());
        System.out.println("Here ====> " + event.toString());
    }
}
