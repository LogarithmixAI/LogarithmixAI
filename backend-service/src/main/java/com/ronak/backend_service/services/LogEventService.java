package com.ronak.backend_service.services;

import com.ronak.backend_service.model.LogEvent;
import com.ronak.backend_service.repository.LogEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogEventService
{
    @Autowired
    private LogEventRepository logEventRepository;

    public void saveLogEvent(LogEvent logEvent)
    {
        System.out.println("Service received: "+logEvent);
        logEventRepository.save(logEvent);
        System.out.println("SAVED TO MONGO");
    }
}
