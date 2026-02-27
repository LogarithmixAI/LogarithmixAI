package com.ronak.backend_service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "log_events")
public class LogEvent
{
    @Id
    private String id;

    private Instant timestamp; //storing as ISODate
    private String serviceName;
    private String level;
    private String message;
    private String host;

    public LogEvent() {
    }

    public LogEvent(String id, Instant timestamp, String serviceName, String level, String message, String host) {
        this.id = id;
        this.timestamp = timestamp;
        this.serviceName = serviceName;
        this.level = level;
        this.message = message;
        this.host = host;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }
}
