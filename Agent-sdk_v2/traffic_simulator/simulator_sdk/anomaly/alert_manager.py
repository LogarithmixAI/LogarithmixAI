class AlertManager:

    def trigger(self, anomalies):

        for a in anomalies:
            print(f"[ALERT] {a['type']} | severity={a.get('severity')}")