import json
import os
import sys
from datetime import timedelta
from pathlib import Path

from apify_client import ApifyClient

ACTOR_ID = "magenta_waterwheel~app-store-reviews-details"
URL = (
    "https://api.apify.com/v2/actors/"
    + ACTOR_ID
    + "/run-sync-get-dataset-items?timeout=300&maxTotalChargeUsd=1"
)


def main() -> None:
    token = os.environ.get("APIFY_TOKEN")
    if not token:
        sys.exit("Set APIFY_TOKEN to your Apify API token.")

    run_input = json.loads(Path(__file__).with_name("input.json").read_text())
    # max_retries=0 so a timeout does not start a second paid run.
    client = ApifyClient(token, max_retries=0)
    # Holds the connection open until the run finishes. Apify closes it after 300 seconds.
    response = client.http_client.call(
        method="POST",
        url=URL,
        json=run_input,
        timeout=timedelta(seconds=300),
    )
    json.dump(response.json(), sys.stdout, indent=2)
    sys.stdout.write("\n")


if __name__ == "__main__":
    main()
