# PDF to Markdown

Turns a PDF, Word, PowerPoint, Excel, CSV, HTML, text, Markdown, or image file at a URL into Markdown. Headings and tables stay. Scanned pages can be OCR'd. Failed files are free.

Actor id: `syhcVYROTsyRdot5v` (`magenta_waterwheel/document-to-markdown`).

Store page: <https://apify.com/magenta_waterwheel/document-to-markdown>

Guide: <https://magentawaterwheel.com/pdf-to-markdown>

## Pricing

Pay per event, from the [Store listing](https://apify.com/magenta_waterwheel/document-to-markdown):

- $3.00 per 1,000 extracted pages ($0.003 each). A page is a text PDF page, a slide, or a 3,000-character section of another format.
- $8.00 per 1,000 OCR pages ($0.008 each). An OCR page is charged only at the OCR price.
- $0.00005 to start the run

Blank pages, failed downloads, unsupported files, and documents with no extractable text are free. The sample input caps the file at 2 pages, about $0.006 if both extract as text.

## Input

`startUrls` is required. Each entry is `{ "url": "..." }`. Google Drive, Google Docs, and Dropbox share links are turned into download links by the Actor.

```json
{
  "startUrls": [
    { "url": "https://arxiv.org/pdf/1706.03762" }
  ],
  "maxPagesPerDocument": 2,
  "ocrMode": "auto",
  "outputMode": "document"
}
```

`ocrMode` is `auto` (only pages with no usable text), `always`, or `never`. `ocrLanguages` defaults to `["eng"]` and also accepts `deu`, `fra`, `spa`, `por`, `ita`, `nld`. `outputMode` is `document` (one item per file, plus a `pages` array) or `page` (one item per page). `pageRange` takes values like `1-5, 8, 20-`. `includePages` defaults to true. `saveMarkdownFiles` defaults to false; turn it on to get a `markdownFileUrl` in the key-value store. `maxFileSizeMb` defaults to 50.

## Output

One item per document when `outputMode` is `document`. This is the Actor README's example, with the Markdown shortened. The sample run only extracts two pages, so `pagesExtracted` will be 2 rather than the full paper.

```json
{
  "url": "https://arxiv.org/pdf/1706.03762",
  "status": "success",
  "error": null,
  "fileName": "1706.03762v7.pdf",
  "format": "pdf",
  "contentType": "application/pdf",
  "fileSizeBytes": 2215244,
  "sha256": "bdfaa68d8984f0dc02beaca527b76f207d99b666d31d1da728ee0728182df697",
  "title": "Attention Is All You Need",
  "author": null,
  "subject": null,
  "createdAt": "2024-04-10T21:11:43",
  "modifiedAt": "2024-04-10T21:11:43",
  "pageUnit": "page",
  "pageCount": 15,
  "pagesExtracted": 15,
  "ocrPages": 0,
  "tableCount": 8,
  "wordCount": 6358,
  "charCount": 40032,
  "truncated": false,
  "warnings": [],
  "markdownFileUrl": null,
  "markdown": "# Attention Is All You Need\n\n...",
  "pages": [
    {
      "pageNumber": 1,
      "markdown": "...",
      "wordCount": 420,
      "isOcr": false,
      "tableCount": 2
    }
  ],
  "chargedPages": 15,
  "chargedOcrPages": 0,
  "extractedAt": "2026-10-08T15:44:47Z"
}
```

`format` is `pdf`, `docx`, `pptx`, `xlsx`, `csv`, `html`, `text`, `markdown`, or `image`. `status` is `success` or `error`. An error item has `error` set (for example `Download failed with HTTP 404.`) and is not charged.

With `outputMode` set to `page`, each page is its own item. The page Markdown is in `markdown`, and the item also has `pageNumber`, `isOcr`, `pageTableCount`, and `pageWordCount`. The `pages` array is document mode only.

A `RUN_SUMMARY` record in the key-value store lists failures and charged pages. This endpoint returns dataset items only.

## Run

```bash
export APIFY_TOKEN="your-token"
bash curl.sh
python run.py          # pip install apify-client
node run.mjs           # npm install apify-client
```

The request is `POST https://api.apify.com/v2/actors/magenta_waterwheel~document-to-markdown/run-sync-get-dataset-items`. It waits up to 300 seconds. The examples set `maxTotalChargeUsd=1`. OCR on a long PDF needs a higher cap: 50 OCR pages is $0.40.
