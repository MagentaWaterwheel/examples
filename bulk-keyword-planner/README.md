# Bulk Keyword Planner

The same Google Keyword Planner fields as [Keyword Search Volume](../keyword-search-volume/), billed as a flat fee per batch of up to 1,000 keywords. Paste keywords, pass a list, or point at a CSV, and look them up in one or many locations. No Google Ads account.

Use Keyword Search Volume for a short list. This Actor charges a full batch even when the list is two keywords.

Actor id: `46vMjqsS6BSdgNliN` (`magenta_waterwheel/bulk-keyword-planner`).

Store page: <https://apify.com/magenta_waterwheel/bulk-keyword-planner>

Guide: <https://magentawaterwheel.com/bulk-keyword-planner>

## Pricing

Pay per event, from the [Store listing](https://apify.com/magenta_waterwheel/bulk-keyword-planner):

- $0.19 per batch of up to 1,000 keywords in one location, charged after data comes back
- no per-keyword fee
- $0.00005 to start the run

Keywords with no data cost nothing extra. 1,000 keywords in one country is one batch ($0.19). 5,000 keywords in three countries is 15 batches ($2.85). A paid Apify plan is required.

The sample input is one location and two keywords, so it is one batch: $0.19.

## Input

`input.json` sends a pasted list and one location. `keywords`, `keywordsText`, and `csvUrl` are combined, lowercased, and de-duplicated. At least one of them has to contain keywords. If `locations` is empty, `location` is used (default `United States`).

```json
{
  "keywordsText": "running shoes\ntrail running shoes",
  "locations": ["United States"],
  "language": "en"
}
```

`csvUrl` is a public CSV or TSV. It reads the column named `keyword`, `keywords`, `query`, or `term`, or the column in `csvColumn`, otherwise the first column. Each location is a separate lookup. `includeCpcCompetition` and `includeMonthlySearches` default to on. `dateFrom` and `dateTo` (`2024-01`) set the monthly history window, up to four years back.

Keywords Google Ads would reject (longer than 80 characters or 10 words, or containing `! @ % , ( )` or emoji) are skipped and listed in the run summary.

## Output

One dataset item per keyword per location. The dataset schema uses the same fields as Keyword Search Volume. Values below only show the types; a live run replaces them. `monthlySearches` items are `{ "month", "searchVolume" }`, newest first, as on Keyword Search Volume.

```json
{
  "keyword": "running shoes",
  "spellCorrection": null,
  "hasData": true,
  "searchVolume": 246000,
  "competition": "HIGH",
  "competitionIndex": 100,
  "cpc": 0.85,
  "lowTopOfPageBid": 0.31,
  "highTopOfPageBid": 1.42,
  "monthlySearches": [
    { "month": "2025-09", "searchVolume": 201000 }
  ],
  "trend3mPct": 4.2,
  "trendYoYPct": -6.1,
  "location": "United States",
  "locationCode": 2840,
  "language": "en",
  "languageCode": "en",
  "searchPartners": false,
  "scrapedAt": "2026-10-15T17:00:00.000Z"
}
```

`competition` is `LOW`, `MEDIUM`, or `HIGH`. `"hasData": false` means Google had no data for that keyword in that location.

Counts, skipped keywords, and batches are on the `RUN_SUMMARY` record in the run's key-value store. This endpoint returns dataset items only.

## Run

```bash
export APIFY_TOKEN="your-token"
bash curl.sh
python run.py          # pip install apify-client
node run.mjs           # npm install apify-client
```

The request is `POST https://api.apify.com/v2/actors/magenta_waterwheel~bulk-keyword-planner/run-sync-get-dataset-items`. It waits up to 300 seconds. The examples set `maxTotalChargeUsd=1`, which covers five batches. Raise it for a larger list.
