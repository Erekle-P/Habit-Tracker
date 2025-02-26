import os
import json
import openai

# Set your OpenAI API key from the environment (.env)
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_ai_response(prompt):
    """
    Generates an AI chat response using GPT-4o-mini (free version).
    """
    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",  # Use the free version model
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {e}"

def sort_all_items(habits, tasks):
    """
    Merges habits and tasks into a single list and sends them to OpenAI for sorting.
    The AI is instructed to return valid JSON only.
    """
    combined_list = []

    for h in habits:
        combined_list.append({
            "type": "habit",
            "title": h.title,
            "description": h.description or "",
            "frequency": h.frequency,
        })

    for t in tasks:
        combined_list.append({
            "type": "task",
            "title": t.title,
            "description": t.description or "",
            "deadline": str(t.deadline) if t.deadline else "",
            "importance": t.importance,
            "status": t.status,
        })

    item_strings = []
    for item in combined_list:
        if item["type"] == "habit":
            item_strings.append(f"- [HABIT] {item['title']} (freq={item['frequency']})")
        else:
            item_strings.append(
                f"- [TASK] {item['title']} (deadline={item['deadline']}, importance={item['importance']}, status={item['status']})"
            )

    prompt_text = f"""You are an AI that prioritizes items. Some are habits (with frequency) and some are tasks (with deadlines/importance).
Here is the list:
{chr(10).join(item_strings)}

Sort them in order of importance or scheduling priority. Return only valid JSON in a list format:
[{{"type": "habit" or "task", "title": "...", "frequency": "..." or null, "deadline": "..." or null, "importance": ... , "status": "..." or null}}]
"""
    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",  # Use the free version model here as well
            messages=[
                {"role": "system", "content": "You must return valid JSON only. No extra text."},
                {"role": "user", "content": prompt_text},
            ],
            temperature=0.7
        )
        content = response.choices[0].message.content
        try:
            sorted_items = json.loads(content)
        except json.JSONDecodeError as e:
            return {"error": f"JSON decode error: {e}. Raw response: {content}"}
        return sorted_items
    except Exception as e:
        return {"error": str(e)}
