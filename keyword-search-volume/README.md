# Keyword Search Volume

Google Ads Keyword Planner data for a list of keywords in one location: average monthly searches, month-by-month history, CPC, top-of-page bids, and competition. No Google Ads account.

Actor id: `Xp6yi5EymYGQIrdxw` (`magenta_waterwheel/keyword-search-volume`).

Store page: <https://apify.com/magenta_waterwheel/keyword-search-volume>

Guide: <https://magentawaterwheel.com/keyword-search-volume-api>

## Pricing

Pay per event, from the [Store listing](https://apify.com/magenta_waterwheel/keyword-search-volume):

- $1.50 per 1,000 keywords that come back with data ($0.0015 each)
- $0.12 per lookup of up to 1,000 keywords
- $0.00005 to start the run

Keywords with no data, invalid keywords, and duplicates are free. The sample input is one lookup and two keywords, about $0.12 if both have data. A paid Apify plan is required. On the Free plan the run stops immediately and is not charged.

Put every keyword for one location in a single run. One lookup covers up to 1,000 keywords.

## Input

`input.json` is what the examples send. `keywords` is required. `location` defaults to `United States` and `language` to `en`. CPC, competition, monthly history, and keywords with no data are included unless you turn those flags off (`includeCpcCompetition`, `includeMonthlySearches`, `includeKeywordsWithoutData`).

```json
{
  "keywords": ["buy laptop", "best running shoes"],
  "location": "United States",
  "language": "en"
}
```

`location` is a Google Ads location name (`United Kingdom`, `London,England,United Kingdom`) or a numeric code (`2840` is the United States). Use `Worldwide` for global volume. `dateFrom` and `dateTo` (`2024-01`) set the monthly history window, up to four years back. Leave them empty for the last 12 months.

## Output

One dataset item per keyword. This is the shape from the Actor README, shortened to two history months:

```json
{
  "keyword": "buy laptop",
  "spellCorrection": null,
  "hasData": true,
  "searchVolume": 2900,
  "competition": "HIGH",
  "competitionIndex": 100,
  "cpc": 7.95,
  "lowTopOfPageBid": 1.69,
  "highTopOfPageBid": 10.04,
  "monthlySearches": [
    { "month": "2023-10", "searchVolume": 2400 },
    { "month": "2023-09", "searchVolume": 2900 }
  ],
  "trend3mPct": 8.5,
  "trendYoYPct": -33.3,
  "location": "United States",
  "locationCode": 2840,
  "language": "en",
  "languageCode": "en",
  "searchPartners": false,
  "scrapedAt": "2026-10-08T17:00:24.127Z"
}
```

A keyword Google has no data for has `"hasData": false`. `competition` is `LOW`, `MEDIUM`, or `HIGH`. `monthlySearches` is newest first. `trend3mPct` is the last three months against the three before that. `trendYoYPct` is the latest month against the same month a year earlier.

Invalid and duplicate keywords are listed on the `RUN_SUMMARY` record in the run's key-value store. This endpoint returns dataset items only, so that record is not in the response.

## Run

```bash
export APIFY_TOKEN="your-token"
bash curl.sh
python run.py          # pip install apify-client
node run.mjs           # npm install apify-client
```

The request is `POST https://api.apify.com/v2/actors/magenta_waterwheel~keyword-search-volume/run-sync-get-dataset-items`. It waits up to 300 seconds and returns a JSON array. The examples also set `maxTotalChargeUsd=1`. Raise that if you send more than a few keywords.
