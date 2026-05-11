class ContextBuilder:

    def build(self, sql_data):

        context = []

        for (req, identity, event) in sql_data.get("requests", []):

            context.append(
                f"""
API: {req.path}
Duration: {req.duration_ms}ms
Status: {req.status_code}

Instance: {identity.instance_id}
Region: {identity.region}
Host: {identity.hostname}
Version: {identity.app_version}
"""
            )

        return "\n".join(context)