# Supabase Data Export Guide

## Quick Start

### 1. Get your Supabase credentials

Go to your Supabase Dashboard:
1. **Project URL & Keys**: Settings → API
   - Copy `Project URL`
   - Copy `anon/public` key
   - Copy `service_role` key (recommended for full access)

2. **Or Database Connection**: Settings → Database → Connection String
   - Use the service role key for complete access

### 2. Add credentials to `.env.local`

Edit the `.env.local` file in the project root and fill in your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Run the export

```bash
npm run export-db
```

This will:
- Connect to your Supabase database
- Export all tables from the `public` schema
- Save each table as a separate JSON file in `supabase-export/`
- Create an `all_data.json` with everything combined
- Generate `export_metadata.json` with schema information

## Export Files

After running, you'll find:

```
supabase-export/
├── all_data.json           # All tables combined
├── export_metadata.json    # Schema info and stats
├── users.json             # Individual table exports
├── events.json
└── ...
```

## If auto-detection fails

If the script can't automatically detect your tables, edit `scripts/export-supabase-data.js` and add your table names to the `TABLES` array:

```javascript
const TABLES = [
  'users',
  'events',
  'cities',
  // ... add your table names here
]
```

## Troubleshooting

### Missing tables
- Check your Supabase dashboard to see table names
- Make sure you're using the `service_role` key for full access
- Verify tables are in the `public` schema

### Permission errors
- Use `SUPABASE_SERVICE_ROLE_KEY` instead of anon key
- Check Row Level Security (RLS) policies in Supabase

### Connection errors
- Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check if your Supabase project is paused (free tier limitation)
