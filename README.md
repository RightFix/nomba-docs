# nomba-docs-python

Static documentation site for [`nomba-python`](https://pypi.org/project/nomba-python/) — the unofficial Python SDK for the [Nomba](https://developer.nomba.com) payments API.

No build step. Open any page directly in a browser, or serve the folder:

```bash
cd nomba-docs-python
python3 -m http.server 8000
# → http://localhost:8000
```

## Pages

| File | Contents |
|---|---|
| `index.html` | Overview, install, coverage summary |
| `getting-started.html` | Sync/async clients, error handling, response shape |
| `features.html` | Pagination, card-payment flow, webhooks, validation, reliability |
| `resources.html` | Full API reference — every method, grouped by resource (generated structure, hand-maintained copy) |
| `changelog.html` | Version history (mirrors the SDK `CHANGELOG.md`) |

## Keeping docs in sync with the SDK

The reference in `resources.html` mirrors the generated SDK in `../nomba-python/src/nomba/resources/`. After regenerating the SDK (`uv run python scripts/generate_resources.py` in `../nomba-python`):

1. Count methods per group and compare with the ledger rows per `<section>`:
   ```bash
   grep -c ledger-row resources.html   # must equal total SDK methods
   ```
2. Add/remove/rename rows to match (method name, HTTP verb, path, summary).
3. Bump the `brand-sub` version on every page and add a `changelog.html` entry.
4. Update the endpoint counts in `index.html` (meta description, intro, coverage card) and `resources.html` (meta description, `h1`).

Current state: **v0.5.0 — 95 non-deprecated endpoints, 14 resource groups.** Endpoints Nomba flags `deprecated` are excluded from both SDK and reference; bill-pay vending targets `/v2/bill/...` under plain method names.
