class AlertManager:

    @staticmethod
    def trigger(anomaly):

        print("\n🚨 ANOMALY DETECTED")
        print(anomaly)

        # future:
        # send slack
        # send webhook
        # send email