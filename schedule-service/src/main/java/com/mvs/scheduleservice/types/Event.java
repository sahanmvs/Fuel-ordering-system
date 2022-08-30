package com.mvs.scheduleservice.types;

import java.time.LocalDate;

public class Event {
    private String from;
    private String type;
    private String key;
    private String uniqueKey;
    private Double amount;
    private String result;
//    private LocalDate date;

    public Event(String from, String type, String key, String uniqueKey, Double amount, String result, LocalDate date) {
        this.from = from;
        this.type = type;
        this.key = key;
        this.uniqueKey = uniqueKey;
        this.amount = amount;
        this.result = result;
//        this.date = date;
    }

    @Override
    public String toString() {
        return "{\"from\":" + "\"" + from + "\"" + ",\"type\":" + "\"" + type + "\"" +",\"key\":" + "\"" + key + "\""+ ",\"uniqueKey\":" + "\"" + uniqueKey + "\"" +",\"amount\":" + "\"" + amount + "\"" +",\"result\":" + "\"" + result + "\""+"}";
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getUniqueKey() {
        return uniqueKey;
    }

    public void setUniqueKey(String uniqueKey) {
        this.uniqueKey = uniqueKey;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
