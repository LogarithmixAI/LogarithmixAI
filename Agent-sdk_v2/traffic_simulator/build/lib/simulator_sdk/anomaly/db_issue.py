def detect_db_issue(db_logs):
    if not db_logs:
        return False
    return any("db error" in str(x).lower() for x in db_logs)