package com.mvs.scheduleservice.service;

import com.mvs.scheduleservice.Repository.ScheduleRepository;
import com.mvs.scheduleservice.collections.Schedule;
import com.mvs.scheduleservice.model.ScheduleModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<ScheduleModel> getAllOrders() {
        List<Schedule> scheduleCollections = scheduleRepository.findAll();

        List<ScheduleModel> schedules = scheduleCollections
                .stream()
                .map(scheduleCollection -> new ScheduleModel(
                        scheduleCollection.getKey(),
                        scheduleCollection.getUniqueKey(),
                        scheduleCollection.getAmount(),
                        scheduleCollection.getResult(),
                        scheduleCollection.getScheduledDate()
                ))
                .collect(Collectors.toList());

        return schedules;
    }
}
