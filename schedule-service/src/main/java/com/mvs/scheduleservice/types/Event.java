package com.mvs.scheduleservice.types;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    private String from;
    private String type;
    private String key;
    private String uniqueKey;
    private Double amount;
    private String result;
}
