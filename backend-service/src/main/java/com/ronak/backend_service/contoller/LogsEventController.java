package com.ronak.backend_service.contoller;

import com.ronak.backend_service.model.LogEvent;
import com.ronak.backend_service.services.LogEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/api/logs")
public class LogsEventController
{
    @Autowired
    private LogEventService logEventService;

    @PostMapping("/add")
    public ResponseEntity<?> saveLogEvent(@RequestBody LogEvent logEvent)
    {
        if(!Objects.isNull(logEvent)){
            logEventService.saveLogEvent(logEvent);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
