package com.mvs.scheduleservice.collections;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@Document(collation = "schedules")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Schedule {
    private String key;
    private String uniqueKey;
    private Double amount;
    private String result;
    private LocalDate scheduledDate;
}
