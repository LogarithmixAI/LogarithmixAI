from app.decoders.factory import DecoderFactory
from app.queue.rebuilder import EventQueueRebuilder
from app.pipeline.engine import PipelineEngine
from app.batch.validator import BatchValidator


class BatchProcessor:

    def process(self, payload, headers=None):

        BatchValidator().validate(payload)

        meta = payload["batch_meta"]
        events = payload["events"]

        decoder = DecoderFactory().get_decoder(meta["sdk_version"])

        decoded_events = decoder.decode(events)

        queue = EventQueueRebuilder().build(decoded_events)

        return PipelineEngine().run(meta, queue)