package com.mvs.scheduleservice.service;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class RandomDate {
    public LocalDate generateDate() {

        LocalDate endDate = LocalDate.now().plusDays(5);
        long end = endDate.toEpochDay();
        System.out.println(end);

        LocalDate startDate = LocalDate.now();
        long start = startDate.toEpochDay();
        System.out.println(start);

        long randomEpochDay = ThreadLocalRandom.current().longs(start, end).findAny().getAsLong();
        return LocalDate.ofEpochDay(randomEpochDay);
    }
}
