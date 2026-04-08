from app.modules.mapper import ModuleMapper
from app.trace.reconstructor import TraceReconstructor
from app.trace.flow_builder import FlowBuilder
from app.storage.repository import Repository
from app.storage.trace_repository import TraceRepository
from app.modules.router import ModuleRouter

class PipelineEngine:

    def run(self, meta, queue):

        repo = Repository()
        router = ModuleRouter()
        trace_repo = TraceRepository()

        mapper = ModuleMapper()
        trace_reconstructor = TraceReconstructor()
        flow_builder = FlowBuilder()

        # ------------------ STORE BATCH ------------------
        batch_id = repo.create_batch(meta)

        # ------------------ EVENT PROCESSING ------------------
        event_ids = []

        for event in queue:

            event_id = repo.create_event(batch_id, event)
            event_ids.append(event_id)

            # identity
            repo.create_identity(event_id, event['identity'])

            # modules
            module = router.route(event)

            if module:
                module.process(event['event'], repo, event_id)

        # ------------------ TRACE PROCESSING ------------------
        traces = trace_reconstructor.reconstruct(queue)

        for trace_id, events in traces.items():
            flow = flow_builder.build_flow(events)
            trace_repo.create_trace(batch_id, trace_id, flow)

        return {
            "status": "stored",
            "batch_id": batch_id,
            "events_processed": len(queue),
            "traces": len(traces)
        }