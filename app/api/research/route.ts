import { NextResponse } from 'next/server'
import { z } from 'zod'
import { connectToDatabase } from '@/app/lib/db'

const researchSchema = z.object({
  title: z.string().min(1),
  abstract: z.string().min(10),
  keywords: z.array(z.string()),
  paperUrl: z.string().url().optional(),
  institution: z.string(),
  country: z.string(),
  authors: z.array(z.string()),
})

export async function GET() {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('research_papers')
    
    // Fetch all research papers
    const papers = await collection.find({}).toArray()
    
    // Transform the data to match our Research interface
    const formattedPapers = papers.map(paper => ({
      id: paper._id.toString(),
      title: paper.title || '',
      abstract: paper.abstract || '',
      authors: paper.authors || [],
      institution: paper.institution || '',
      country: paper.country || '',
      keywords: paper.keywords || [],
      paperUrl: paper.paperUrl || '',
      publishedAt: paper.publishedAt ? new Date(paper.publishedAt).toISOString() : new Date().toISOString()
    }))
    
    return NextResponse.json(formattedPapers)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch research papers' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validated = researchSchema.parse(body)
    
    const db = await connectToDatabase()
    const collection = db.collection('research_papers')
    
    const newPaper = {
      ...validated,
      publishedAt: new Date(),
      createdAt: new Date()
    }
    
    const result = await collection.insertOne(newPaper)
    
    return NextResponse.json({
      id: result.insertedId,
      ...newPaper
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}