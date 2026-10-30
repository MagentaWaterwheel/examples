#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${APIFY_TOKEN:-}" ]]; then
  echo "Set APIFY_TOKEN to your Apify API token." >&2
  exit 1
fi

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# The sync endpoint holds the connection until the run finishes, at most 300 seconds.
curl --fail-with-body --max-time 320 -X POST \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @"${dir}/input.json" \
  "https://api.apify.com/v2/actors/magenta_waterwheel~ai-search-visibility/run-sync-get-dataset-items?timeout=300&maxTotalChargeUsd=1"
echo
