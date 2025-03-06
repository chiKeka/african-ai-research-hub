'use client'

import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import ResearchCard from './components/ResearchCard'
import StaticAfricaMap from './components/StaticAfricaMap'

// Define the Research interface
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

export default function Home() {
  const [research, setResearch] = useState<Research[]>([])
  const [filteredResearch, setFilteredResearch] = useState<Research[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [topicFilter, setTopicFilter] = useState('')
  const [uniqueCountries, setUniqueCountries] = useState<string[]>([])
  const [uniqueTopics, setUniqueTopics] = useState<string[]>([])
  const [countryStats, setCountryStats] = useState<Array<{ country: string, papers: number }>>([])

  // Fetch research papers from the database
  useEffect(() => {
    const fetchResearch = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/research')
        if (!response.ok) {
          throw new Error('Failed to fetch research papers')
        }
        const data = await response.json()
        setResearch(data)
        
        // Extract unique countries and topics
        const countries = [...new Set(data.map((r: Research) => r.country))].filter(Boolean)
        const topics = [...new Set(data.flatMap((r: Research) => r.keywords))].filter(Boolean)
        
        setUniqueCountries(countries)
        setUniqueTopics(topics)
        
        // Calculate country statistics for the map
        const countryData = countries.map(country => {
          const count = data.filter((r: Research) => r.country === country).length
          return { country, papers: count }
        })
        setCountryStats(countryData)
        
        setFilteredResearch(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching research:', error)
        setIsLoading(false)
      }
    }
    
    fetchResearch()
  }, [])
  
  // Filter research based on search term, country, and topic
  useEffect(() => {
    if (research.length === 0) return
    
    let filtered = [...research]
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(term) || 
        r.abstract.toLowerCase().includes(term) ||
        r.authors.some(author => author.toLowerCase().includes(term)) ||
        r.institution.toLowerCase().includes(term)
      )
    }
    
    if (countryFilter) {
      filtered = filtered.filter(r => r.country === countryFilter)
    }
    
    if (topicFilter) {
      filtered = filtered.filter(r => r.keywords.includes(topicFilter))
    }
    
    setFilteredResearch(filtered)
  }, [research, searchTerm, countryFilter, topicFilter])
  
  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }
  
  const handleCountrySelect = (country: string) => {
    setCountryFilter(country)
  }
  
  const handleTopicSelect = (topic: string) => {
    setTopicFilter(topic)
  }
  
  // Loading placeholder
  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">African AI Research Hub</h1>
        <p className="text-gray-600 mb-8">Discover AI research from across Africa</p>
        <div className="animate-pulse">
          <div className="h-[600px] bg-gray-200 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </main>
    )
  }
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">African AI Research Hub</h1>
      <p className="text-gray-600 mb-8">Discover AI research from across Africa</p>
      
      <StaticAfricaMap 
        countryData={countryStats}
        onCountrySelect={handleCountrySelect}
        selectedCountry={countryFilter}
      />
      
      <SearchBar 
        onSearch={handleSearch} 
        onCountrySelect={handleCountrySelect}
        onTopicSelect={handleTopicSelect}
        countries={uniqueCountries}
        topics={uniqueTopics}
        selectedCountry={countryFilter}
        selectedTopic={topicFilter}
      />
      
      {filteredResearch.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No research papers found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredResearch.map(paper => (
            <ResearchCard key={paper.id} research={paper} />
          ))}
        </div>
      )}
    </main>
  )
}