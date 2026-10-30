# Google AI Overviews and AI Mode tracker

Checks a prompt on live Google results and returns the AI Overview or AI Mode answer, the cited sources, and whether your brand and domain showed up. You can pass competitor names and get a rank against them.

Actor id: `i7cRXix1iznuq6mi2` (`magenta_waterwheel/google-ai-overviews-tracker`).

Store page: <https://apify.com/magenta_waterwheel/google-ai-overviews-tracker>

Guide: <https://magentawaterwheel.com/ai-overview-tracker>

## Pricing

Pay per event, from the [Store listing](https://apify.com/magenta_waterwheel/google-ai-overviews-tracker):

- $0.02 per Google AI Overviews check. Charged even when Google shows no overview, because the search still runs. The item then has `aiAnswerPresent: false`.
- $0.03 per Google AI Mode answer
- $0.00005 to start the run

Failed checks and duplicate prompts are free. The sample input is one prompt on AI Overviews only, so $0.02. The Free plan can run up to 10 checks per run.

## Input

`prompts` is required. `engines` is `google_aio`, `google_ai_mode`, or both. Empty means both.

```json
{
  "prompts": ["best crm for small business"],
  "engines": ["google_aio"],
  "brand": "HubSpot",
  "domain": "hubspot.com",
  "competitors": ["Salesforce", "Zoho"],
  "country": "US"
}
```

`brand` is matched as a whole word, case-insensitive. `brandAliases` adds other spellings that count as a mention. `domain` matches subdomains too. `country` is an optional two-letter code. The example uses `US`. Results are in English. `includeSources` defaults to true and adds every source linked in the answer, not only the inline citations.

## Output

One dataset item per prompt and engine. This is the Actor README's example, shortened. Real answers change from day to day.

```json
{
  "prompt": "best crm for small business",
  "engine": "google_aio",
  "model": "google-ai-overview",
  "aiAnswerPresent": true,
  "answer": "The best CRM for a small business depends on your specific goals, team size, and budget: ### Top CRMs by Use Case - **Best Free Tier & Ease of Use:** HubSpot CRM offers a free plan ...",
  "citations": [
    {
      "position": 1,
      "url": "https://www.uschamber.com/co/start/strategy/low-cost-crm-tools",
      "title": null,
      "domain": "uschamber.com"
    }
  ],
  "citationCount": 7,
  "brand": "HubSpot",
  "brandMentioned": true,
  "brandRank": 1,
  "domain": "hubspot.com",
  "domainCited": false,
  "competitors": [{ "name": "Zoho", "mentioned": true, "mentionCount": 2, "rank": 3 }],
  "country": null,
  "error": null
}
```

The dataset schema also includes `promptIndex`, `brandMentionCount`, `brandFirstMentionIndex`, `domainCitationPosition`, `domainCitationCount`, `domainInSources`, `sources`, `searchQueries`, `answeredAt`, and `notice`. `citations` items are `position`, `url`, `title`, `domain`. Competitor objects are `name`, `mentioned`, `mentionCount`, `rank`. `brandRank` 1 means the brand was mentioned first. `notice` is set instead of a normal result in some cases, including a Free-plan limit.

When Google shows no AI Overview, `aiAnswerPresent` is false and `answer` is null. A failed check sets `error` and is not charged.

## Run

```bash
export APIFY_TOKEN="your-token"
bash curl.sh
python run.py          # pip install apify-client
node run.mjs           # npm install apify-client
```

The request is `POST https://api.apify.com/v2/actors/magenta_waterwheel~google-ai-overviews-tracker/run-sync-get-dataset-items`. It waits up to 300 seconds. The examples set `maxTotalChargeUsd=1`.
