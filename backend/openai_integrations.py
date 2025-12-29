import openai
import os
from dotenv import load_dotenv

load_dotenv()

def get_openai_response(api_key, prompt):
    """
    This function gets a response from the OpenAI API.
    """
    client = openai.OpenAI(api_key=api_key)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.strip()
