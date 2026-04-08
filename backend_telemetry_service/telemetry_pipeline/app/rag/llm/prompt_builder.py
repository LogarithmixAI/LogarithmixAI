class PromptBuilder:

    def build(self, query, context):

        return f"""
You are an expert backend debugging AI.

User Query:
{query}

System Context:
{context}

Instructions:
- Identify root cause clearly
- Explain why it happened
- Mention affected components (API, DB, function, instance)
- Suggest fix

Answer in structured format:
1. Problem
2. Root Cause
3. Impact
4. Fix Suggestion
"""