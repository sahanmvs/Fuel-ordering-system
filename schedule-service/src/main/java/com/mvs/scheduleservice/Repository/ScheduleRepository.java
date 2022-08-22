package com.mvs.scheduleservice.Repository;

import com.mvs.scheduleservice.collections.Schedule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends MongoRepository<Schedule, String> {

}
