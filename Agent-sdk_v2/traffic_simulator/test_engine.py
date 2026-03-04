from simulator_sdk.anomaly.anomaly_engine import AnomalyEngine
from simulator_sdk.anomaly.runtime_metrics import RuntimeMetrics

# create metrics object
metrics = RuntimeMetrics()

# simulate traffic spike
for _ in range(70):
    metrics.record_request()

# simulate repeated errors
for _ in range(12):
    metrics.record_event("exception")

# simulate latency spike
metrics.record_latency(650)

# run anomaly engine
engine = AnomalyEngine(metrics)
result = engine.run()

print("Detected Anomalies:")
print(result)