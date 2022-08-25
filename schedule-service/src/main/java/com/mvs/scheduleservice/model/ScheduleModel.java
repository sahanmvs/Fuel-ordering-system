package com.mvs.scheduleservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleModel {
    private String key;
    private String uniqueKey;
    private Double amount;
    private String result;
    private LocalDate scheduledDate;
}
