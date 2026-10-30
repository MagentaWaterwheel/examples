# Magenta Waterwheel examples

Examples for the public [Magenta Waterwheel](https://magentawaterwheel.com) Actors on the [Apify Store](https://apify.com/magenta_waterwheel). Each folder calls one Actor and prints the dataset items.

The call is the same in curl, Python, and JavaScript:

```text
POST https://api.apify.com/v2/actors/<username>~<name>/run-sync-get-dataset-items
```

The token comes from the `APIFY_TOKEN` environment variable. Get one at [Apify Console → Integrations](https://console.apify.com/account/integrations).

These examples wait until the run finishes, up to 300 seconds, then return the dataset items as a JSON array. A longer run gets HTTP 408 from this endpoint; the run can still finish in the Console. Each example also sends `maxTotalChargeUsd=1` so a first run stops before it can cost more than a dollar. Raise that query parameter if you send a larger input.

## Actors

| Actor | Store | On magentawaterwheel.com |
| --- | --- | --- |
| [Keyword Search Volume](keyword-search-volume/) | [Store](https://apify.com/magenta_waterwheel/keyword-search-volume) | [Keyword Planner API](https://magentawaterwheel.com/keyword-search-volume-api) |
| [Bulk Keyword Planner](bulk-keyword-planner/) | [Store](https://apify.com/magenta_waterwheel/bulk-keyword-planner) | [Bulk Keyword Planner](https://magentawaterwheel.com/bulk-keyword-planner) |
| [AI Overviews tracker](google-ai-overviews-tracker/) | [Store](https://apify.com/magenta_waterwheel/google-ai-overviews-tracker) | [AI Overview tracker](https://magentawaterwheel.com/ai-overview-tracker) |
| [AI Search Visibility Tracker](ai-search-visibility/) | [Store](https://apify.com/magenta_waterwheel/ai-search-visibility) | [AI visibility tracker](https://magentawaterwheel.com/ai-visibility-tracker) |
| [PDF to Markdown](document-to-markdown/) | [Store](https://apify.com/magenta_waterwheel/document-to-markdown) | [PDF to Markdown](https://magentawaterwheel.com/pdf-to-markdown) |
| [App Store Reviews](app-store-reviews-details/) | [Store](https://apify.com/magenta_waterwheel/app-store-reviews-details) | [App Store reviews scraper](https://magentawaterwheel.com/app-store-reviews-scraper) |

Prices in each folder are copied from that Actor's Store listing. Check the Store page before a large run.

## Quickstart

```bash
export APIFY_TOKEN="your-token"

cd keyword-search-volume
bash curl.sh
```

Python (`pip install apify-client`):

```bash
python run.py
```

JavaScript (`npm install apify-client`):

```bash
node run.mjs
```

Edit `input.json` in the folder to change the Actor input. Keyword Search Volume, Bulk Keyword Planner, and AI Search Visibility need a paid Apify plan. On the Free plan those runs stop immediately and are not charged.
