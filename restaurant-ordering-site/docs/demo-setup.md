# Restrova lead form setup

The first form always includes restaurant details and required contact details. The existing qualification rules are retained. Multiple-branch restaurants cannot select one branch; “Not Started Yet” is not offered.

- A qualifying submission creates a private, encrypted 20-minute session and opens `/demo/schedule`. It does not write to Google Sheets yet.
- A completed schedule sends restaurant details, contact details, qualification status, preferred day/time (Pakistan Time), and platform to the `Leads` tab. Success clears the session and redirects to `/demo/thank-you`.
- Other submissions are saved only to the separate `Other Enquiries` tab, then redirected to the same neutral thank-you page. They never enter `Leads` or trigger a Meta Lead event.
- Saving must be acknowledged before a success redirect. A scheduling failure preserves the draft for retry. A stable submission ID prevents duplicate qualified rows during retries.

## Local configuration

Run `npm run setup:demo` once. This creates random private values in `.env.local`, without printing them. Existing values are preserved. The session secret fixes the reported missing-secret failure on qualified intake.

Configuration keys:

| Key | Purpose |
| --- | --- |
| `RESTROVA_DEMO_SESSION_SECRET` | Encrypts the short-lived form session; at least 32 characters. |
| `RESTROVA_SHEETS_SHARED_SECRET` | Authenticates server requests to Apps Script; at least 32 characters. |
| `GOOGLE_SHEETS_URL` | Deployed Apps Script URL: `https://script.google.com/macros/s/DEPLOYMENT_ID/exec`. |

Keep these server-side; never use a `NEXT_PUBLIC_` prefix. Do not commit `.env.local`. Set the same configuration on your production host. Restart the development server after editing it.

## Google Sheet receiver

1. Open the intended Google Sheet, then **Extensions → Apps Script**. Preserve any unrelated code in that project. Install the supplied root `Code.gs` receiver, replacing the old receiver's `doPost` if one exists.
2. In **Project Settings → Script properties**, set `RESTROVA_SHEETS_SHARED_SECRET` to the same private value in `.env.local`. Set `RESTROVA_SPREADSHEET_ID` to the ID between `/d/` and `/edit` in your Sheet URL. No secret belongs in the source file.
3. Use **Deploy → New deployment → Web app**. Run as yourself and allow **Anyone** to access it so the Next.js server can call it. The receiver authenticates every request using the private shared secret.
4. Put the deployment URL ending in `/exec` into `GOOGLE_SHEETS_URL` in `.env.local` and in production. A spreadsheet link or the `/dev` test URL is not sufficient.
5. For later receiver changes, update the deployed web app to a new version. The new API checks `schemaVersion`, `stored`, and the submission ID, so an older receiver cannot silently claim successful storage.

The receiver uses `Leads` and `Other Enquiries` tabs and creates them when missing. It locates columns by header and appends missing headers, preserving existing columns and rows. The two tabs are distinct: only scheduled, qualifying contacts enter `Leads`.

Google references: [Web app deployment](https://developers.google.com/apps-script/guides/web) and [Script properties](https://developers.google.com/apps-script/guides/properties).

## Verification

Run `npm run test:demo` for qualification, route/session, failure/retry, and Apps Script storage tests. Tests use a simulated spreadsheet and do not submit test contacts to your real Sheet. Also run `npx tsc --noEmit` and `npm run build`.

After configuring and deploying Apps Script, verify with a clearly identified test contact that a qualifying intake creates no row until scheduling, and that a non-qualifying submission appears only in `Other Enquiries`. Remove test rows after verification.
