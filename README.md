# ClinicBook: an intentionally vulnerable demo app

ClinicBook is a small appointment-booking app built the way AI app builders such as Lovable or Bolt tend to generate them: React and Vite on the front, Supabase for the database, storage and edge functions, and Stripe for payments.

It was written on purpose with security mistakes that show up again and again in AI-built apps. It is the target of a sample Launch Audit report, which documents 11 findings with evidence, reproduction steps and fixes.

**Do not deploy this app.** Every key in it is fake.

## What's wrong with it

| ID | Severity | Finding |
|---|---|---|
| C1 | Critical | Supabase service-role key is shipped to every browser |
| C2 | Critical | Patients table is readable by anyone, including diagnoses |
| C3 | Critical | Row-level security is off on appointments |
| H1 | High | Medical documents are stored in a public bucket |
| H2 | High | Stripe webhook accepts forged events and is not idempotent |
| H3 | High | The browser decides how much the customer pays |
| H4 | High | Secrets file is committed to the repository |
| M1 | Medium | Admin access is checked only in the browser, by email domain |
| M2 | Medium | Checkout function has no authentication and allows any origin |
| M3 | Medium | Stored XSS through appointment notes |
| M4 | Medium | Full payment events, including customer details, are written to logs |

The full report explains each one. Ask for a copy on Upwork.

## Layout

```
src/                      React frontend
supabase/migrations/      Database schema, policies and storage buckets
supabase/functions/       Edge functions for checkout and the Stripe webhook
.env                      Fake keys, committed on purpose (see H4)
```

## Reproducing C1

```
npm install
npx vite build
grep -o 'demo-service-role-key' dist/assets/*.js
```

The key appears in the bundle every visitor downloads.

## License

MIT. Use it to practice reviews or to train a team.
