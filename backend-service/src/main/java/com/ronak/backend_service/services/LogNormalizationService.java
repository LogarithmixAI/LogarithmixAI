package com.ronak.backend_service.services;

import com.ronak.backend_service.dto.IngestLogRequest;
import com.ronak.backend_service.model.LogEvent;

public interface LogNormalizationService {
    LogEvent normalize(IngestLogRequest ingestLogRequest);
}
