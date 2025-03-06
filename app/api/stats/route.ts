import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'

export async function GET() {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('research_papers')
    
    // Get total papers count
    const totalPapers = await collection.countDocuments()
    
    // Get unique institutions
    const institutions = await collection.distinct('institution')
    const totalInstitutions = institutions.length
    
    // Get unique countries
    const countries = await collection.distinct('country')
    const totalCountries = countries.length
    
    // Get top countries by paper count
    const topCountriesAgg = await collection.aggregate([
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]).toArray()
    
    const topCountries = topCountriesAgg.map(item => ({
      country: item._id || 'Unknown',
      count: item.count
    }))
    
    // Get top keywords
    const topKeywordsAgg = await collection.aggregate([
      { $unwind: '$keywords' },
      { $group: { _id: '$keywords', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]).toArray()
    
    const topKeywords = topKeywordsAgg.map(item => ({
      keyword: item._id || 'Unknown',
      count: item.count
    }))
    
    return NextResponse.json({
      totalPapers,
      totalInstitutions,
      totalCountries,
      topCountries,
      topKeywords
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}