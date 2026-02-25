from .detectors.traffic_spike import detect_spike
from .detectors.repeated_error import detect_repeated


class RulesEngine:

    @staticmethod
    def detect(event):

        anomalies = []

        spike = detect_spike()
        if spike:
            anomalies.append(spike)

        repeated = detect_repeated(event)
        if repeated:
            anomalies.append(repeated)

        return anomalies