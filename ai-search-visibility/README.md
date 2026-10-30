# AI Search Visibility Tracker

Asks ChatGPT, Perplexity, and Gemini a prompt with live web search, then records the answer, the cited sources, and whether your brand and domain showed up. Competitor names get a rank in the same answer.

Actor id: `pSSKsXapfo4dRaDqL` (`magenta_waterwheel/ai-search-visibility`).

Store page: <https://apify.com/magenta_waterwheel/ai-search-visibility>

Guide: <https://magentawaterwheel.com/ai-visibility-tracker>

## Pricing

Pay per answer (one prompt on one engine), from the [Store listing](https://apify.com/magenta_waterwheel/ai-search-visibility):

- Perplexity: $0.04
- Gemini: $0.08
- ChatGPT: $0.18
- $0.00005 per GB of memory to start the run (minimum 1 GB)

Failed answers, skipped engines, and duplicate prompts are free. If `engines` is empty, Perplexity and Gemini are used. The sample input is one Perplexity answer: $0.04. A paid Apify plan is required.

## Input

`prompts` is required. Each prompt is asked once on every selected engine.

```json
{
  "prompts": ["What is the best project management software for small teams?"],
  "engines": ["perplexity"],
  "brand": "Trello",
  "domain": "trello.com",
  "competitors": ["Asana", "ClickUp"],
  "country": "US"
}
```

`engines` accepts `chatgpt`, `perplexity`, and `gemini`. `brand` is matched as a whole word, case-insensitive. `brandAliases` adds other spellings. `domain` matches subdomains. `country` is a two-letter code and localizes ChatGPT and Perplexity search. Gemini ignores it. `includeSources` defaults to true and adds every source the engine retrieved, not only the ones cited in the answer.

## Output

One dataset item per prompt and engine. The Actor README's example is shortened and illustrative. The `model` value changes with the engine.

```json
{
  "prompt": "What is the best project management software for small teams?",
  "engine": "perplexity",
  "model": "openai/gpt-6-luna",
  "answer": "For small teams, Trello, Asana and ClickUp are the most common picks[1][2]. Trello is the simplest for kanban boards[3] ...",
  "citations": [
    {
      "position": 1,
      "url": "https://www.example-reviews.com/best-pm-software",
      "title": "Best project management software",
      "domain": "example-reviews.com"
    }
  ],
  "citationCount": 3,
  "searchQueries": ["best project management software small teams"],
  "brand": "Trello",
  "brandMentioned": true,
  "brandMentionCount": 2,
  "brandFirstMentionIndex": 17,
  "brandRank": 1,
  "domain": "trello.com",
  "domainCited": true,
  "domainCitationPosition": 3,
  "domainCitationCount": 1,
  "competitors": [
    { "name": "Asana", "mentioned": true, "mentionCount": 1, "rank": 2 }
  ],
  "country": "US",
  "answeredAt": "2026-10-08T17:00:00.000Z",
  "error": null
}
```

The dataset schema also includes `promptIndex`, `sources`, `domainInSources`, and `notice`. Citation objects are `position`, `url`, `title`, `domain`. Competitor objects are `name`, `mentioned`, `mentionCount`, `rank`. `brandRank` 1 means the brand was mentioned first. `domainInSources` is true when the domain was retrieved but not cited. `error` is set and the answer is not charged when the engine fails. `notice` is set instead of a normal result in some cases, including a Free-plan limit.

Per-engine totals (`brandMentionRate`, `domainCitationRate`, `averageBrandRank`) are on the `RUN_SUMMARY` record in the key-value store. This endpoint returns dataset items only.

## Run

```bash
export APIFY_TOKEN="your-token"
bash curl.sh
python run.py          # pip install apify-client
node run.mjs           # npm install apify-client
```

The request is `POST https://api.apify.com/v2/actors/magenta_waterwheel~ai-search-visibility/run-sync-get-dataset-items`. It waits up to 300 seconds. The examples set `maxTotalChargeUsd=1`. One prompt on all three engines is $0.30, so the cap still covers that. A long prompt list needs a higher cap.
