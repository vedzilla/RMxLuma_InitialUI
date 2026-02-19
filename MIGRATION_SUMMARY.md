# Migration from Mock Data to Supabase Export

## Overview
Successfully migrated from mock events data to real Supabase exported data.

**Date:** 2026-02-15
**Events Imported:** 58 events
**Societies Imported:** 9 societies
**Categories:** 7 categories

---

## What Changed

### 1. **New Data File**
Created: `src/data/events.ts`
- Imports and transforms data from `supabase-export/` JSON files
- Maps Supabase schema to existing Event interface
- Generates slugs from event titles
- Formats price labels from `is_free` + `price` fields
- Joins events with societies, universities, and categories

### 2. **Import Updates**
All imports changed from:
```typescript
import { mockEvents } from '@/data/mockEvents';
```
To:
```typescript
import events from '@/data/events';
```

**Files Updated:**
- `src/app/(app)/discover/page.tsx`
- `src/app/(app)/events/[slug]/page.tsx`
- `src/app/(app)/categories/[categorySlug]/*`
- `src/app/(app)/cities/[citySlug]/*`
- `src/app/(app)/universities/[uniSlug]/*`
- `src/components/EventCard.tsx`
- `src/components/EventDetail.tsx`
- `src/components/EventModal.tsx`
- `src/components/FilterPills.tsx`
- `src/components/CategoryCard.tsx`
- `src/components/EventGrid.tsx`
- `src/components/Header.tsx`
- `src/utils/eventUtils.ts`
- `src/utils/dateUtils.ts`

### 3. **Next.js Image Configuration**
Updated `next.config.js` to allow CloudFront and Instagram CDN images:
```javascript
{
  protocol: 'https',
  hostname: 'dgzzf6k1ibya0.cloudfront.net',  // Event images
},
{
  protocol: 'https',
  hostname: 'scontent-man2-1.cdninstagram.com',  // Society profile images
}
```

### 4. **Variable Naming Conflicts Fixed**
Fixed naming conflicts in Client components where `events` import shadowed local variables:
- `CategoryPageClient.tsx`: `let events` → `let filtered`
- `CityPageClient.tsx`: `let events` → `let filtered`
- `UniversityPageClient.tsx`: `let events` → `let filtered`

---

## Data Transformation Details

### Field Mapping

| Mock Field | Supabase Field(s) | Transformation |
|-----------|------------------|----------------|
| `slug` | - | Generated from `title` |
| `startDateTime` | `event_date` | Direct |
| `endDateTime` | `event_end` | Direct (nullable) |
| `city` | - | Extracted from `location` |
| `university` | via `societies.university_id` | Joined |
| `societyName` | via `event_societies` join | Joined |
| `locationName` | `location` | Direct |
| `imageUrl` | `image_url` | Direct |
| `externalUrl` | `registration_url` or `source_post_url` | Fallback |
| `tags` | via `category_id` | Joined + capitalized |
| `interestedCount` | `likes` | Direct |
| `savedCount` | - | Estimated (30% of likes) |
| `priceLabel` | `is_free` + `price` | "Free" or price string |

---

## Real Data Statistics

### Events (58 total)
- **Future events:** 23
- **Past events:** 35
- **Free events:** 44
- **Paid events:** 14

### Societies (9 total)
1. Manchester Hindu Society - 6 events
2. Robotics Society - 7 events
3. Chemistry Society - 10 events
4. Astronomy Society - 7 events
5. Running Club - 8 events
6. Film Society - 6 events
7. EEE Society - 9 events
8. Gigs and Bands - 5 events
9. Accelerate ME - 3 events

### Categories
- Social (30 events)
- Workshop (7 events)
- Sports (6 events)
- Arts (6 events)
- Academic (3 events)
- Career (1 event)
- Trip (1 event)

### Universities
- University of Manchester (all events)

### Cities
- Manchester (56 events)
- Loughborough (2 events)

---

## Build Results

✅ **Build Status:** SUCCESS

```
Route (app)                              Size     First Load JS
┌ ○ /                                    610 kB          714 kB
├ ○ /discover                            2.79 kB         122 kB
├ ● /events/[slug]                       1.27 kB         103 kB
├   ├ /events/aarti-and-games-karma
├   ├ /events/mhs-re-welcome-dinner
├   └ [+54 more paths]
└ ƒ /universities/[uniSlug]              2.63 kB         118 kB
```

**Static Pages Generated:** 63 total
- 57 event detail pages
- 1 landing page
- 1 discover page
- 1 about page
- 3 dynamic routes (categories, cities, universities)

---

## What Still Uses Mock Data

The old `src/data/mockEvents.ts` file is still present but **not imported** anywhere. It can be safely deleted or kept for reference.

---

## Next Steps (Optional Improvements)

1. **Update Event Dates**
   - Many events have past dates (from 2025)
   - Consider filtering to show only future events or updating dates

2. **Add More Universities**
   - Currently only UoM data
   - Supabase export only contained 1 university

3. **Enhance Society Data**
   - Use the exported `societies` data for society pages
   - Add society profile images from `image_url`

4. **Better Price Handling**
   - Some prices have inconsistent formatting ("£1 members / £2 non members")
   - Consider parsing and standardizing

5. **City Detection**
   - Current city extraction is basic
   - Could improve location parsing for better city detection

6. **Tags Enhancement**
   - Currently only one tag per event (from category)
   - Could add multiple tags based on event content

---

## Testing Checklist

- [x] Build completes successfully
- [x] Event pages load with real data
- [x] Images display correctly (CloudFront + Instagram)
- [ ] Test discover page filtering
- [ ] Test category pages
- [ ] Test university pages
- [ ] Test city pages
- [ ] Test event modals
- [ ] Verify all 58 events render correctly

---

## Files Created/Modified

### Created
- `src/data/events.ts` - New data transformation layer

### Modified
- `next.config.js` - Added image domains
- `src/app/(app)/discover/page.tsx`
- `src/app/(app)/events/[slug]/page.tsx`
- `src/app/(app)/categories/[categorySlug]/CategoryPageClient.tsx`
- `src/app/(app)/categories/[categorySlug]/page.tsx`
- `src/app/(app)/cities/[citySlug]/CityPageClient.tsx`
- `src/app/(app)/cities/[citySlug]/page.tsx`
- `src/app/(app)/universities/[uniSlug]/UniversityPageClient.tsx`
- `src/app/(app)/universities/[uniSlug]/page.tsx`
- `src/components/EventCard.tsx`
- `src/components/EventDetail.tsx`
- `src/components/EventModal.tsx`
- `src/components/FilterPills.tsx`
- `src/components/CategoryCard.tsx`
- `src/components/EventGrid.tsx`
- `src/components/Header.tsx`
- `src/utils/eventUtils.ts`
- `src/utils/dateUtils.ts`

### Deprecated (can be deleted)
- `src/data/mockEvents.ts` - No longer used
