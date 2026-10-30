# App Store Reviews

Apple App Store and Google Play reviews, plus an app-details record, for the countries you list. No store login.

Actor id: `ghl6EjfvbgIOdwpEb` (`magenta_waterwheel/app-store-reviews-details`).

Store page: <https://apify.com/magenta_waterwheel/app-store-reviews-details>

Guide: <https://magentawaterwheel.com/app-store-reviews-scraper>

## Pricing

Pay per event, from the [Store listing](https://apify.com/magenta_waterwheel/app-store-reviews-details):

- $0.25 per 1,000 reviews saved ($0.00025 each)
- $2.00 per 1,000 app-details records ($0.002 each), one record per app per country
- $0.00005 to start the run

Reviews filtered out by star rating or date are free. The sample input is one app, one country, and at most 10 reviews: about $0.005, including the app record.

## Input

Pass Apple apps in `apps` and Google Play apps in `playApps`. At least one of the two should be set. The sample only asks for Duolingo on the US App Store.

```json
{
  "apps": [
    "https://apps.apple.com/us/app/duolingo-language-lessons/id570060128"
  ],
  "countries": ["us"],
  "maxReviewsPerCountry": 10,
  "sortBy": "mostrecent"
}
```

An Apple app can be a store URL, a numeric id (`324684580`), or a bundle id (`com.spotify.client`). A Play app can be a package name (`com.duolingo`) or a `play.google.com/store/apps/details?id=` URL. `countries` are two-letter codes. `sortBy` is `mostrecent` or `mosthelpful`. `minRating` and `maxRating` are 1–5. `reviewsNewerThan` is a date; reviews on or after that date are kept. `includeAppDetails` and `includeReviews` both default to true. `includeReviewerName` defaults to false. Apple's public feed exposes up to 500 reviews per country, which is also the maximum for `maxReviewsPerCountry`.

## Output

Every item has `recordType` of `review` or `app`. These are the Actor README's examples, with the app record shortened.

Review:

```json
{
  "recordType": "review",
  "reviewId": "14633649772",
  "appId": 570060128,
  "appName": "Duolingo: Language & Chess",
  "country": "gb",
  "rating": 5,
  "title": "I love Duolingo",
  "text": "it’s a very good app",
  "appVersion": "7.142.0",
  "reviewedAt": "2026-10-06T08:59:39.000Z",
  "voteSum": 0,
  "voteCount": 0,
  "reviewerName": null,
  "sortBy": "mostrecent",
  "scrapedAt": "2026-10-07T20:14:08.664Z"
}
```

App details:

```json
{
  "recordType": "app",
  "appId": 324684580,
  "country": "us",
  "name": "Spotify: Music and Podcasts",
  "bundleId": "com.spotify.client",
  "developerName": "Spotify",
  "averageRating": 4.77203,
  "ratingCount": 42443544,
  "formattedPrice": "Free",
  "version": "9.1.88",
  "primaryGenre": "Music",
  "appUrl": "https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580?uo=4",
  "scrapedAt": "2026-10-07T20:15:18.492Z"
}
```

An app record can also include `developerId`, `sellerName`, `genres`, `price`, `currency`, `averageRatingCurrentVersion`, `ratingCountCurrentVersion`, `currentVersionReleaseDate`, `releaseDate`, `releaseNotes`, `description`, `minimumOsVersion`, `fileSizeBytes`, `contentRating`, `languages`, `supportedDevicesCount`, `iconUrl`, `screenshotUrls`, `ipadScreenshotUrls`, `developerUrl`, and `sellerUrl`. `reviewerName` is null unless `includeReviewerName` is true.

A `RUN_SUMMARY` record in the key-value store lists reviews per country, apps missing from a storefront, and failed requests. This endpoint returns dataset items only.

## Run

```bash
export APIFY_TOKEN="your-token"
bash curl.sh
python run.py          # pip install apify-client
node run.mjs           # npm install apify-client
```

The request is `POST https://api.apify.com/v2/actors/magenta_waterwheel~app-store-reviews-details/run-sync-get-dataset-items`. It waits up to 300 seconds. The examples set `maxTotalChargeUsd=1`, which covers about 4,000 reviews. Raise it for a bigger pull.
