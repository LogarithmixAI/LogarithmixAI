from fastapi import FastAPI, Header, HTTPException, Request
import hmac
import hashlib
import json
from datetime import datetime, timezone
import os
import ipaddress

LOG_FILE = "events.json"

app = FastAPI()

# Demo storage (replace with DB later)
API_KEYS = {
    "demo-key": {
        "secret": "super-secret",
        "allowed_ips": ["127.0.0.1"]
    }
}
EVENT_STORE = []
REPLAY_CACHE = set()

def persist_json(record):
    if not os.path.exists(LOG_FILE):
        with open(LOG_FILE, "w") as f:
            json.dump([], f)

    with open(LOG_FILE, "r+") as f:
        data = json.load(f)
        data.append(record)
        f.seek(0)
        json.dump(data, f, indent=2)

def ip_allowed(client_ip: str, allowed_list: list[str]) -> bool:
    try:
        ip_obj = ipaddress.ip_address(client_ip)

        for rule in allowed_list:
            if "/" in rule:
                if ip_obj in ipaddress.ip_network(rule):
                    return True
            else:
                if client_ip == rule:
                    return True
    except Exception:
        pass

    return False


def verify_signature(api_key, timestamp, signature, body):

    if api_key not in API_KEYS:
        raise HTTPException(status_code=401, detail="Invalid API key")

    secret = API_KEYS[api_key]['secret']

    message = timestamp + json.dumps(body, sort_keys=True)

    expected_signature = hmac.new(
        secret.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

    # 🔎 Debug (remove later)
    if expected_signature != signature:
        print("\n❌ Signature mismatch")
        print("timestamp:", timestamp)
        print("body:", body[:200])
        print("received:", signature)
        print("expected:", expected_signature)

    if not hmac.compare_digest(signature, expected_signature):
        raise HTTPException(status_code=401, detail="Invalid signature")

    # timestamp freshness
    try:
        ts = datetime.fromisoformat(timestamp)
        now = datetime.now(timezone.utc)

        if abs((now - ts).total_seconds()) > 300:
            raise HTTPException(status_code=401, detail="Timestamp expired")

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid timestamp")

    # replay protection
    replay_key = api_key + timestamp + signature
    if replay_key in REPLAY_CACHE:
        raise HTTPException(status_code=401, detail="Replay detected")

    REPLAY_CACHE.add(replay_key)


@app.post("/api/logs")
async def receive_logs(
    request: Request,
    x_api_key: str = Header(...),
    x_timestamp: str = Header(...),
    x_signature: str = Header(...)
):

    # raw body for signature verification
    body_bytes = await request.body()
    body_str = body_bytes.decode()

    client_ip = request.client.host

    api_data = API_KEYS.get(x_api_key)
    if not api_data:
        raise HTTPException(401, "Invalid API key")

    if not ip_allowed(client_ip, api_data["allowed_ips"]):
        raise HTTPException(403, "IP not allowed")

    # ✅ enable verification
    verify_signature(
        x_api_key,
        x_timestamp,
        x_signature,
        body_str
    )

    # safe JSON parsing
    try:
        payload = json.loads(body_str)
    except Exception:
        raise HTTPException(400, "Invalid JSON")

    # batch guard
    if payload.get("batch_meta", {}).get("event_count", 0) > 1000:
        raise HTTPException(413, "Batch too large")

    # capture real client IP
    client_ip = request.client.host

    print("\n📦 Received Batch from:", client_ip)
    print("Event Count:", payload["batch_meta"]["event_count"])
    for event in payload["events"]:
        print("→", event["event"]["type"])

    record = {
    "ip": client_ip,
    "api_key": x_api_key,
    "received_at": datetime.utcnow().isoformat(),
    "payload": payload
    }

    EVENT_STORE.append(record)
    persist_json(record)
    

    return {"status": "received"}