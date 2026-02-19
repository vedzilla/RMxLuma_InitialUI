const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

// **TABLE NAMES FROM SCHEMA**
const TABLES = [
  // Reference tables
  'universities',
  'study_levels',
  'interests',
  'categories',
  'interaction_types',
  // Core tables
  'users',
  'societies',
  'events',
  // Junction tables
  'event_societies',
  'event_images',
  'post_images',
  // User interaction tables
  'user_interests',
  'user_interactions',
  'user_follows'
]

const supabase = createClient(supabaseUrl, supabaseKey)

async function exportTables(tableNames, exportDir) {
  const allData = {}
  const metadata = {
    exportedAt: new Date().toISOString(),
    supabaseUrl,
    tables: {}
  }

  for (const tableName of tableNames) {
    try {
      console.log(`📥 Exporting table: ${tableName}`)

      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })

      if (error) {
        console.error(`  ❌ Error: ${error.message}`)
        metadata.tables[tableName] = { error: error.message }
        continue
      }

      const tableFile = path.join(exportDir, `${tableName}.json`)
      fs.writeFileSync(tableFile, JSON.stringify(data, null, 2))

      allData[tableName] = data

      metadata.tables[tableName] = {
        rowCount: count || data.length,
        columns: data.length > 0 ? Object.keys(data[0]) : []
      }

      console.log(`  ✓ Exported ${count || data.length} rows`)
    } catch (error) {
      console.error(`  ❌ Error exporting ${tableName}:`, error.message)
      metadata.tables[tableName] = { error: error.message }
    }
  }

  const combinedFile = path.join(exportDir, 'all_data.json')
  fs.writeFileSync(combinedFile, JSON.stringify(allData, null, 2))

  const metadataFile = path.join(exportDir, 'export_metadata.json')
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2))

  console.log(`\n📊 Export Summary:`)
  console.log(`  Total tables: ${tableNames.length}`)
  console.log(`  Total rows: ${Object.values(metadata.tables).reduce((sum, t) => sum + (t.rowCount || 0), 0)}`)
}

async function main() {
  console.log('🚀 Starting Supabase data export...\n')

  if (TABLES.length === 0) {
    console.error('❌ No tables specified!')
    console.log('\nPlease edit this file and add your table names to the TABLES array.')
    console.log('Example: const TABLES = [\'users\', \'events\', \'cities\']\n')
    process.exit(1)
  }

  const exportDir = path.join(__dirname, '..', 'supabase-export')

  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true })
  }

  console.log(`📋 Exporting ${TABLES.length} tables: ${TABLES.join(', ')}\n`)

  await exportTables(TABLES, exportDir)

  console.log(`\n✅ Export complete! Files saved to: ${exportDir}`)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Export failed:', err.message)
    process.exit(1)
  })
