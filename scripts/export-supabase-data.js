const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function exportDatabase() {
  console.log('🚀 Starting Supabase data export...\n')

  const exportDir = path.join(__dirname, '..', 'supabase-export')

  // Create export directory
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true })
  }

  try {
    // Since we can't auto-detect tables easily, let's manually specify them
    // You can find your table names in the Supabase Dashboard → Database → Tables
    const TABLES = [
      // Add your table names here, e.g.:
      // 'users',
      // 'events',
      // 'cities',
    ]

    if (TABLES.length === 0) {
      console.log('⚠️  No tables specified in the TABLES array.')
      console.log('\nTo export your data:')
      console.log('1. Go to your Supabase Dashboard → Database → Tables')
      console.log('2. Note the names of your tables')
      console.log('3. Add them to the TABLES array in this script\n')
      console.log('Example:')
      console.log('  const TABLES = [\'users\', \'events\', \'cities\']')
      console.log('\nOr, let me try to fetch all tables automatically...\n')

      // Try to get tables using a direct SQL query
      const { data: tables, error } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public')

      if (error) {
        console.log('❌ Could not auto-detect tables:', error.message)
        console.log('\nPlease add your table names manually to the TABLES array.')
        return
      }

      if (tables && tables.length > 0) {
        const tableNames = tables.map(t => t.tablename)
        console.log(`📋 Found ${tableNames.length} tables: ${tableNames.join(', ')}\n`)
        await exportTables(tableNames, exportDir)
      } else {
        console.log('No tables found. Please add table names manually.')
        return
      }
    } else {
      console.log(`📋 Exporting ${TABLES.length} specified tables: ${TABLES.join(', ')}\n`)
      await exportTables(TABLES, exportDir)
    }

    console.log(`\n✅ Export complete! Files saved to: ${exportDir}`)
  } catch (error) {
    console.error('❌ Export failed:', error.message)
    throw error
  }
}

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

      // Fetch all data from the table
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })

      if (error) {
        console.error(`  ❌ Error: ${error.message}`)
        metadata.tables[tableName] = { error: error.message }
        continue
      }

      // Save individual table as JSON
      const tableFile = path.join(exportDir, `${tableName}.json`)
      fs.writeFileSync(tableFile, JSON.stringify(data, null, 2))

      // Add to combined export
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

  // Save combined export
  const combinedFile = path.join(exportDir, 'all_data.json')
  fs.writeFileSync(combinedFile, JSON.stringify(allData, null, 2))

  // Save metadata
  const metadataFile = path.join(exportDir, 'export_metadata.json')
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2))

  console.log(`\n📊 Export Summary:`)
  console.log(`  Total tables: ${tableNames.length}`)
  console.log(`  Total rows: ${Object.values(metadata.tables).reduce((sum, t) => sum + (t.rowCount || 0), 0)}`)
}

// Run the export
exportDatabase()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
