package com.ronak.backend_service.dto;

import java.time.Instant;
import java.util.Map;

public class IngestLogRequest
{
    private Instant timestamp;
    private String level;
    private String service;
    private String host;
    private String traceId;
    private String rawLog;
    private Map<String, Object> strucutureData;

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getTraceId() {
        return traceId;
    }

    public void setTraceId(String traceId) {
        this.traceId = traceId;
    }

    public String getRawLog() {
        return rawLog;
    }

    public void setRawLog(String rawLog) {
        this.rawLog = rawLog;
    }

    public Map<String, Object> getStrucutureData() {
        return strucutureData;
    }

    public void setStrucutureData(Map<String, Object> strucutureData) {
        this.strucutureData = strucutureData;
    }
}
