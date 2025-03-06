'use client'

import React from 'react'

interface Research {
  id: string
  title: string
  abstract: string
  authors: string[]
  institution: string
  country: string
  keywords: string[]
  paperUrl: string
  publishedAt: string
}

interface ResearchCardProps {
  research: Research
}

export default function ResearchCard({ research }: ResearchCardProps) {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  // Truncate abstract to a reasonable length
  const truncateAbstract = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-800">{research.title}</h3>
        
        <p className="text-gray-600 mb-4">
          {truncateAbstract(research.abstract)}
        </p>
        
        <div className="mb-4 flex flex-wrap gap-1">
          {research.keywords.map((keyword, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {keyword}
            </span>
          ))}
        </div>
        
        <div className="text-sm text-gray-500 mb-2">
          <strong>Authors:</strong> {research.authors.join(', ')}
        </div>
        
        <div className="text-sm text-gray-500 mb-2">
          <strong>Institution:</strong> {research.institution}
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          <strong>Country:</strong> {research.country}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Published: {formatDate(research.publishedAt)}
          </span>
          
          {research.paperUrl && (
            <a 
              href={research.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Paper →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}