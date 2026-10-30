import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ApifyClient } from 'apify-client';

const actorId = 'magenta_waterwheel~ai-search-visibility';
const url =
  'https://api.apify.com/v2/actors/' +
  actorId +
  '/run-sync-get-dataset-items?timeout=300&maxTotalChargeUsd=1';

const token = process.env.APIFY_TOKEN;
if (!token) {
  console.error('Set APIFY_TOKEN to your Apify API token.');
  process.exit(1);
}

const inputPath = join(dirname(fileURLToPath(import.meta.url)), 'input.json');
const runInput = JSON.parse(readFileSync(inputPath, 'utf8'));

// maxRetries: 0 so a timeout does not start a second paid run.
// timeoutSecs covers the sync endpoint, which can take the full 300 seconds.
const client = new ApifyClient({ token, maxRetries: 0, timeoutSecs: 360 });

const response = await client.httpClient.call({
  method: 'POST',
  url,
  data: runInput,
});

console.log(JSON.stringify(response.data, null, 2));
