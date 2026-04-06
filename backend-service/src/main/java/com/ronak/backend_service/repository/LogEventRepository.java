package com.ronak.backend_service.repository;

import com.ronak.backend_service.model.LogEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogEventRepository extends MongoRepository<LogEvent, String> {
}
