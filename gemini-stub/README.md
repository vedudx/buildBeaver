# Gemini Stub

When `GEMINI_API_KEY` is not set, the app runs in stub mode:

1. Click "Find permits with Beaver AI" on the Licenses step
2. Open `gemini-stub/prompt.txt` — this is the exact prompt that would be sent
3. Paste it into https://gemini.google.com
4. Copy Gemini's JSON response into `gemini-stub/response.json`
5. Click the button again — the app will load your response

## Expected response.json format

```json
{
  "relevant": [
    { "index": 0, "reason": "One sentence explaining why this permit applies." },
    { "index": 2, "reason": "Another reason." }
  ]
}
```

The index numbers refer to the permits listed in `prompt.txt`.
