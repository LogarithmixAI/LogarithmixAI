import streamlit as st
import requests

st.markdown("""
<style>
.block-container {
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
}

.stBottom div div{
max-width: 750px;
padding-left: 3px;
padding-right: 6px;
# background: red; 
}


</style>
""", unsafe_allow_html=True)


st.title("🤖 AI Debug Chatbot")

# Sidebar filters
project = st.sidebar.text_input("Project", "client-test-app")
environment = st.sidebar.selectbox("Environment", ["production", "staging", "dev"])
instance_id = st.sidebar.text_input("Instance ID (optional)")
region = st.sidebar.text_input("Region (optional)")

# Chat history
if "history" not in st.session_state:
    st.session_state.history = []

# Input
query = st.chat_input("Ask your query...")

if query:
    params = {
        "query": query,
        "project": project,
        "environment": environment,
        "instance_id": instance_id or None,
        "region": region or None
    }

    try:
        with st.spinner("Analyzing..."):
            res = requests.get("http://localhost:8000/ask", params=params)
            data = res.json()

    except Exception as e:
        data = {"error": str(e)}

    # Save chat
    st.session_state.history.append(("user", query))
    st.session_state.history.append(("bot", str(data['answer']) if 'answer' in data else data.get("error", "server not responding please try again laterthank you for your patience") ))

# Display chat
for role, msg in st.session_state.history:
    if role == "user":
        st.chat_message("user").write(msg)
    else:
        text = msg.replace("###", "##")
        st.chat_message("assistant").write(text)