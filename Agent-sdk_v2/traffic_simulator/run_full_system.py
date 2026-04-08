import time
import random

from simulator_sdk.anomaly.anomaly_engine import AnomalyEngine
from simulator_sdk.anomaly.runtime_metrics import RuntimeMetrics


metrics = RuntimeMetrics()
engine = AnomalyEngine(metrics)


def simulate_traffic():

    # simulate requests
    for _ in range(random.randint(30, 80)):
        metrics.record_request()

    # simulate errors
    for _ in range(random.randint(0, 15)):
        metrics.record_event("exception")

    # simulate auth failures
    for _ in range(random.randint(0, 8)):
        metrics.record_event("auth_fail")

    # simulate dependency errors
    for _ in range(random.randint(0, 5)):
        metrics.record_event("dependency_error")

    # simulate latency
    metrics.record_latency(random.randint(100, 800))


print("🚀 Starting Full Simulation...\n")

for cycle in range(5):

    print(f"\n--- Cycle {cycle + 1} ---")

    simulate_traffic()

    anomalies = engine.run()

    if anomalies:
        print("Detected:", anomalies)
    else:
        print("No anomalies detected.")

    # reset runtime metrics for next cycle
    metrics = RuntimeMetrics()
    engine = AnomalyEngine(metrics)

    time.sleep(2)

print("\n✅ Simulation Finished")