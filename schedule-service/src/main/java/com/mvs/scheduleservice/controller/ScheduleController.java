package com.mvs.scheduleservice.controller;

import com.mvs.scheduleservice.model.ScheduleModel;
import com.mvs.scheduleservice.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/schedule/")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/orders")
    public List<ScheduleModel> getAllOrders() {
        System.out.println("get all scheduled orders");
        return scheduleService.getAllOrders();
    }
}
