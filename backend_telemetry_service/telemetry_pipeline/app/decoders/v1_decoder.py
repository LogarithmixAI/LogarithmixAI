from app.builder.reconstructed_event import ReconstructedEvent


class V1Decoder:

    def decode(self, events):

        reconstructed = []

        for raw in events:
            event = ReconstructedEvent(raw)
            reconstructed.append(event)

        return reconstructed