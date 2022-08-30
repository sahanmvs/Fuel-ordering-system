package com.mvs.scheduleservice.types;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class EventProducer {
    private String from;
    private String type;
    private String key;

    public EventProducer(String from, String type, String key, String uniqueKey, Double amount, String result, LocalDate date) {
        this.from = from;
        this.type = type;
        this.key = key;
        this.uniqueKey = uniqueKey;
        this.amount = amount;
        this.result = result;
        this.date = date;
    }

    private String uniqueKey;
    private Double amount;
    private String result;
    private LocalDate date;

    @Override
    public String toString() {
        return "{\"from\":" + "\"" + from + "\"" + ",\"type\":" + "\"" + type + "\"" +",\"key\":" + "\"" + key + "\""+ ",\"uniqueKey\":" + "\"" + uniqueKey + "\"" +",\"amount\":" + "\"" + amount + "\"" +",\"result\":" + "\"" + result + "\""+",\"date\":" + "\"" + date + "\"" +"}";
    }

}
