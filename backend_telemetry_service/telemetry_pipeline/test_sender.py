import requests
import json
import uuid
from datetime import datetime, timezone


def current_utc():
    return datetime.now(timezone.utc).isoformat()


def generate_event(event_type, status="SUCCESS"):

    return {}


def send_batch():
    null = None
    payload = {
      "batch_meta": {
        "environment": "production",
        "event_count": 37,
        "project": "client-test-app",
        "schema_version": "1.0",
        "sdk_version": "2.0.0",
        "sent_at": "2026-03-17T15:39:28.034226+00:00"
      },
      "events": [
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/search",
              "status_code": 200,
              "thread": "Thread-3 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:23.070808+00:00",
            "trace_id": "d77cb78e-134d-42b4-b801-4733183f84d5"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "acee6117-cbff-40e8-b5d1-8d5340f63c11",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:23.070863+00:00",
            "trace_id": "d77cb78e-134d-42b4-b801-4733183f84d5"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/blog",
              "status_code": 200,
              "thread": "Thread-4 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Linux; Android 12)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:23.073258+00:00",
            "trace_id": "587b7075-2d0b-4abb-b445-d7f18e34c744"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "88e3af75-6825-4f60-9ccb-d011da3c4c2d",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:23.073302+00:00",
            "trace_id": "587b7075-2d0b-4abb-b445-d7f18e34c744"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/search",
              "status_code": 200,
              "thread": "Thread-5 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:23.075780+00:00",
            "trace_id": "f8f268ba-771d-419d-94e0-e077fd9fc657"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "46b6863c-32a4-4407-9c8c-189ce37dea8e",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:23.075819+00:00",
            "trace_id": "f8f268ba-771d-419d-94e0-e077fd9fc657"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "file": "C:\\Users\\DeLL\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\flask\\app.py",
              "function": "log_exception",
              "level": "ERROR",
              "line": 875,
              "logger_name": "client_test",
              "message": "Exception on /products [GET]",
              "thread": "Thread-2 (process_request_thread)"
            },
            "metrics": {},
            "severity": "HIGH",
            "status": "FAILURE",
            "type": "LOG"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:23.078438+00:00",
            "trace_id": "4cb0e5e4-6ab6-41e5-ade4-ca6a3197c938"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/products",
              "status_code": 500,
              "thread": "Thread-2 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)"
            },
            "metrics": {
              "duration_ms": 11
            },
            "severity": "LOW",
            "status": "FAILURE",
            "type": "SERVER_ERROR"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:23.078790+00:00",
            "trace_id": "4cb0e5e4-6ab6-41e5-ade4-ca6a3197c938"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "fdc3e293-eca2-49f1-8f14-ef333b2eef5a",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 11
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:23.078817+00:00",
            "trace_id": "4cb0e5e4-6ab6-41e5-ade4-ca6a3197c938"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/blog",
              "status_code": 200,
              "thread": "Thread-6 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Linux; Android 12)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:24.743205+00:00",
            "trace_id": "b5923e34-2c4d-4d01-9207-b28f55483a6c"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "c08e1d3e-3083-4b92-a4fa-28c821f940c7",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:24.743250+00:00",
            "trace_id": "b5923e34-2c4d-4d01-9207-b28f55483a6c"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/product/2",
              "status_code": 200,
              "thread": "Thread-7 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:24.785496+00:00",
            "trace_id": "d819df9d-437e-4d60-8cf7-f1e845161c3e"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "1da7af72-8ca4-4b7f-aa2f-d399f8abda97",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:24.785542+00:00",
            "trace_id": "d819df9d-437e-4d60-8cf7-f1e845161c3e"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "file": "C:\\Users\\DeLL\\Desktop\\Ai-assistant-distributors\\AI-Assisted-Distributed-Log-Monitoring-System\\Agent-sdk_v2\\client_test.py",
              "function": "not_found",
              "level": "WARNING",
              "line": 282,
              "logger_name": "root",
              "message": "User accessed invalid route",
              "thread": "Thread-8 (process_request_thread)"
            },
            "metrics": {},
            "severity": "MEDIUM",
            "status": "SUCCESS",
            "type": "LOG"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:24.892708+00:00",
            "trace_id": "6cfb0edd-b7b6-423c-9fd3-0f2669b31584"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/produts",
              "status_code": 404,
              "thread": "Thread-8 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "FAILURE",
            "type": "CLIENT_ERROR"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:24.892866+00:00",
            "trace_id": "6cfb0edd-b7b6-423c-9fd3-0f2669b31584"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "24a97036-5436-4ec7-829b-5936729c7e42",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:24.892888+00:00",
            "trace_id": "6cfb0edd-b7b6-423c-9fd3-0f2669b31584"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/product/1",
              "status_code": 200,
              "thread": "Thread-9 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:25.049233+00:00",
            "trace_id": "b9c8a2ee-1c4a-451f-8307-c4b518b7af9d"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "93d46e13-384a-4df8-a1bf-06f07d1780aa",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 1
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:25.049296+00:00",
            "trace_id": "b9c8a2ee-1c4a-451f-8307-c4b518b7af9d"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/product/1",
              "status_code": 200,
              "thread": "Thread-10 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Linux; Android 12)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:25.803409+00:00",
            "trace_id": "eb4d9612-2dba-40f0-a4c2-f9cd5c371fe3"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "d8733744-7109-4134-8951-28b6bbdb77ef",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:25.803514+00:00",
            "trace_id": "eb4d9612-2dba-40f0-a4c2-f9cd5c371fe3"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/cart",
              "status_code": 401,
              "thread": "Thread-11 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "FAILURE",
            "type": "CLIENT_ERROR"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:26.480451+00:00",
            "trace_id": "9deceabf-6416-41b2-b337-17d10229c09f"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "f95cddd1-6a94-4d83-90bd-0a03ebf24be4",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:26.480491+00:00",
            "trace_id": "9deceabf-6416-41b2-b337-17d10229c09f"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "file": "C:\\Users\\DeLL\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\flask\\app.py",
              "function": "log_exception",
              "level": "ERROR",
              "line": 875,
              "logger_name": "client_test",
              "message": "Exception on /products [GET]",
              "thread": "Thread-12 (process_request_thread)"
            },
            "metrics": {},
            "severity": "HIGH",
            "status": "FAILURE",
            "type": "LOG"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:26.885893+00:00",
            "trace_id": "73d550bc-2173-452e-8c48-4eed9d026e43"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/products",
              "status_code": 500,
              "thread": "Thread-12 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
            },
            "metrics": {
              "duration_ms": 2
            },
            "severity": "LOW",
            "status": "FAILURE",
            "type": "SERVER_ERROR"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:26.886268+00:00",
            "trace_id": "73d550bc-2173-452e-8c48-4eed9d026e43"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "4410598e-e815-484d-9209-2212be009f3d",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 3
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:26.886298+00:00",
            "trace_id": "73d550bc-2173-452e-8c48-4eed9d026e43"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "POST",
              "path": "/login-redirect",
              "status_code": 302,
              "thread": "Thread-13 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.040883+00:00",
            "trace_id": "6bc76cb6-9d8c-448b-95df-7307ff31e701"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "3fea5f03-1ee9-424c-8819-9ba6d57e9cb7",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.040952+00:00",
            "trace_id": "6bc76cb6-9d8c-448b-95df-7307ff31e701"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "file": "C:\\Users\\DeLL\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\werkzeug\\_internal.py",
              "function": "_log",
              "level": "INFO",
              "line": 97,
              "logger_name": "werkzeug",
              "message": "x.x.x.x - - [17/Mar/2026 21:09:27] \"\u001b[32mPOST /login-redirect HTTP/1.1\u001b[0m\" 302 -",
              "thread": "Thread-13 (process_request_thread)"
            },
            "metrics": {},
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "LOG"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.042341+00:00",
            "trace_id": "136fbde4-f743-4428-a494-4cc2449e758a"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/dashboard",
              "status_code": 200,
              "thread": "Thread-14 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.066755+00:00",
            "trace_id": "3cf75e98-9f41-4f63-a608-c08c1f48e318"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "6dabfd4d-486c-4316-aab1-3b81ec9a722f",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.066802+00:00",
            "trace_id": "3cf75e98-9f41-4f63-a608-c08c1f48e318"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/blog",
              "status_code": 200,
              "thread": "Thread-15 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.575384+00:00",
            "trace_id": "1181e769-1b80-4eaa-90c4-5a888da9ab27"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "333f7cab-be34-45b0-b446-108960c171da",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.575429+00:00",
            "trace_id": "1181e769-1b80-4eaa-90c4-5a888da9ab27"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/search",
              "status_code": 200,
              "thread": "Thread-16 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Linux; Android 12)"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "INCOMING_REQUEST"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.766726+00:00",
            "trace_id": "f3984ef9-7a30-4145-91ae-a921a592b027"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "3e8dfde9-be2a-4a1a-9aca-56586db67028",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 0
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.766801+00:00",
            "trace_id": "f3984ef9-7a30-4145-91ae-a921a592b027"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "file": "C:\\Users\\DeLL\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\flask\\app.py",
              "function": "log_exception",
              "level": "ERROR",
              "line": 875,
              "logger_name": "client_test",
              "message": "Exception on /checkout [GET]",
              "thread": "Thread-17 (process_request_thread)"
            },
            "metrics": {},
            "severity": "HIGH",
            "status": "FAILURE",
            "type": "LOG"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.953824+00:00",
            "trace_id": "1bfd738a-1e0b-4d7a-8cfa-5b9fdd39a20c"
          }
        },
        {
          "event": {
            "category": "APPLICATION",
            "data": {
              "client_ip": "127.0.0.1",
              "method": "GET",
              "path": "/checkout",
              "status_code": 500,
              "thread": "Thread-17 (process_request_thread)",
              "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
            },
            "metrics": {
              "duration_ms": 3
            },
            "severity": "LOW",
            "status": "FAILURE",
            "type": "SERVER_ERROR"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.954159+00:00",
            "trace_id": "1bfd738a-1e0b-4d7a-8cfa-5b9fdd39a20c"
          }
        },
        {
          "event": {
            "category": "PERFORMANCE",
            "data": {
              "name": "http_request",
              "parent_span_id": null,
              "span_id": "8b158645-44a5-47bd-9214-5708122000e6",
              "type": "HTTP"
            },
            "metrics": {
              "duration_ms": 4
            },
            "severity": "LOW",
            "status": "SUCCESS",
            "type": "SPAN"
          },
          "identity": {
            "app_version": "1.0.0",
            "hostname": "DESKTOP-N00M686",
            "instance_id": "8ed293ae-de5d-458a-a980-ad5fa32eb63d",
            "os": "Windows",
            "os_version": "11",
            "process_id": 15072,
            "python_version": "3.13.4",
            "region": "unknown"
          },
          "meta": {
            "environment": "production",
            "project": "client-test-app",
            "schema_version": "1.0",
            "sdk_version": "2.0.0",
            "timestamp": "2026-03-17T15:39:27.954191+00:00",
            "trace_id": "1bfd738a-1e0b-4d7a-8cfa-5b9fdd39a20c"
          }
        }
      ]
    }

    url = "http://127.0.0.1:8000/ingest"

    response = requests.post(url, json=payload)

    print("Status:", response.status_code)
    print("Response:", response.text)


if __name__ == "__main__":
    send_batch()