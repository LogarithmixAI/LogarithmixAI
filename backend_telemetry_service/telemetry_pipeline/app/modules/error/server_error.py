def create_error(self, data):

    obj = models.ErrorModule(
        id=str(uuid.uuid4()),
        event_id=data["event_id"],
        exception=data["exception"],
        endpoint=data["endpoint"]
    )

    self.db.add(obj)
    self.db.commit()