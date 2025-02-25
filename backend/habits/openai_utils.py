import openai
import os

# Load OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_ai_response(prompt):
    """Generates a response using OpenAI's API."""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ]
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error: {e}"
